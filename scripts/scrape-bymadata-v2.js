#!/usr/bin/env node
/**
 * Scraper mejorado de BYMADATA
 * Extrae datos de Obligaciones Negociables desde múltiples fuentes
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URLs de BYMADATA
const URLS = {
  dashboard: 'https://open.bymadata.com.ar/#/dashboard',
  rentaFija: 'https://open.bymadata.com.ar/#/renta-fija',
  on: 'https://open.bymadata.com.ar/#/renta-fija/obligaciones-negociables',
  curvaON: 'https://open.bymadata.com.ar/#/renta-fija/curva-on',
};

/**
 * Extrae datos de la tabla de Obligaciones Negociables
 */
async function scrapeTablaON(page) {
  console.log('Intentando extraer datos de tabla...');
  
  // Esperar a que la tabla cargue
  await page.waitForTimeout(3000);
  
  // Intentar múltiples selectores de tabla
  const selectores = [
    'table tbody tr',
    '.table tbody tr',
    '[class*="table"] tbody tr',
    '[class*="row"]',
    'tr[data-testid]',
  ];
  
  for (const selector of selectores) {
    const datos = await page.evaluate((sel) => {
      const filas = document.querySelectorAll(sel);
      const resultado = [];
      
      filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        if (celdas.length >= 4) {
          resultado.push({
            ticker: celdas[0]?.textContent?.trim() || '',
            descripcion: celdas[1]?.textContent?.trim() || '',
            precio: celdas[2]?.textContent?.trim() || '',
            variacion: celdas[3]?.textContent?.trim() || '',
            volumen: celdas[4]?.textContent?.trim() || '',
          });
        }
      });
      
      return resultado;
    }, selector);
    
    if (datos.length > 0) {
      console.log(`✅ Encontrados ${datos.length} registros con selector: ${selector}`);
      return datos;
    }
  }
  
  return [];
}

/**
 * Extrae datos de elementos con data attributes
 */
async function scrapeDataAttributes(page) {
  console.log('Intentando extraer datos de data attributes...');
  
  const datos = await page.evaluate(() => {
    const resultado = [];
    
    // Buscar elementos que contengan información de ON
    const elementos = document.querySelectorAll('[data-ticker], [data-symbol], [class*="ticker"], [class*="symbol"]');
    
    elementos.forEach(el => {
      const ticker = el.getAttribute('data-ticker') || 
                    el.getAttribute('data-symbol') || 
                    el.textContent?.trim();
      
      if (ticker && ticker.length > 2) {
        resultado.push({
          ticker: ticker,
          descripcion: el.getAttribute('data-name') || ticker,
          precio: el.getAttribute('data-price') || '0',
          variacion: el.getAttribute('data-change') || '0',
        });
      }
    });
    
    return resultado;
  });
  
  console.log(`✅ Encontrados ${datos.length} registros con data attributes`);
  return datos;
}

/**
 * Extrae datos del localStorage o sessionStorage
 */
async function scrapeStorageData(page) {
  console.log('Intentando extraer datos de storage...');
  
  const datos = await page.evaluate(() => {
    const resultado = [];
    
    // Intentar obtener datos del localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      
      if (key?.includes('on') || key?.includes('renta') || key?.includes('data')) {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            resultado.push(...parsed);
          }
        } catch (e) {
          // No es JSON válido
        }
      }
    }
    
    return resultado;
  });
  
  console.log(`✅ Encontrados ${datos.length} registros en storage`);
  return datos;
}

/**
 * Extrae datos interceptando requests de API
 */
async function scrapeAPIRequests(page) {
  console.log('Configurando interceptación de requests...');
  
  const apiData = [];
  
  // Interceptar requests
  page.on('response', async (response) => {
    const url = response.url();
    
    if (url.includes('api') || url.includes('data') || url.includes('json')) {
      try {
        const contentType = response.headers()['content-type'];
        if (contentType?.includes('json')) {
          const json = await response.json();
          apiData.push(json);
          console.log(`🌐 API interceptada: ${url}`);
        }
      } catch (e) {
        // No es JSON
      }
    }
  });
  
  // Navegar a la página
  await page.goto(URLS.on, {
    waitUntil: 'networkidle',
    timeout: 60000,
  });
  
  // Esperar un poco para capturar requests
  await page.waitForTimeout(5000);
  
  console.log(`✅ Interceptadas ${apiData.length} respuestas de API`);
  return apiData;
}

/**
 * Scraper principal
 */
async function scrapeBymadata() {
  console.log('='.repeat(60));
  console.log('SCRAPER MEJORADO DE BYMADATA');
  console.log('='.repeat(60));
  console.log();
  
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--ignore-certificate-errors',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
  });
  
  try {
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      viewport: { width: 1920, height: 1080 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    
    const page = await context.newPage();
    
    // Estrategia 1: Interceptar requests de API
    console.log('\n📡 Estrategia 1: Interceptar requests de API');
    const apiData = await scrapeAPIRequests(page);
    
    // Estrategia 2: Extraer de tabla
    console.log('\n📊 Estrategia 2: Extraer datos de tabla');
    const tablaData = await scrapeTablaON(page);
    
    // Estrategia 3: Extraer de data attributes
    console.log('\n🏷️  Estrategia 3: Extraer data attributes');
    const attrData = await scrapeDataAttributes(page);
    
    // Estrategia 4: Extraer de storage
    console.log('\n💾 Estrategia 4: Extraer de storage');
    const storageData = await scrapeStorageData(page);
    
    // Combinar todos los datos
    const todosLosDatos = [
      ...apiData,
      ...tablaData,
      ...attrData,
      ...storageData,
    ];
    
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Total de datos encontrados: ${todosLosDatos.length}`);
    console.log('='.repeat(60));
    
    return todosLosDatos;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

/**
 * Transforma datos al formato INVERSO
 */
function transformarDatos(datos) {
  if (!datos || datos.length === 0) {
    console.log('⚠️  No hay datos para transformar');
    return [];
  }
  
  console.log('🔄 Transformando datos...');
  
  return datos
    .filter(d => d.ticker && d.ticker.length > 0)
    .map((dato, index) => {
      const precio = parseFloat(dato.precio?.replace(/[^0-9.,]/g, '').replace(',', '.')) || 100;
      const variacion = parseFloat(dato.variacion?.replace(/[^0-9.,-]/g, '').replace(',', '.')) || 0;
      
      return {
        id: `scraped-${index}`,
        ticker: dato.ticker.toUpperCase(),
        nombre: dato.descripcion || dato.ticker,
        emisor: dato.descripcion?.split(' ')[0] || 'Desconocido',
        tipo: 'obligacion_negociable',
        moneda: detectarMoneda(dato),
        tasa_anual: Math.abs(variacion),
        plazo_dias: 1095,
        plazo_meses: 36,
        amortizacion: 'bullet',
        frecuencia_pagos: 'semestral',
        calificacion: 'AA',
        calificadora: 'Fix SCR',
        sector: detectarSector(dato.descripcion),
        vencimiento: calcularVencimiento(),
        precio_actual: precio,
        valor_nominal: 100,
        rendimiento_ytm: Math.abs(variacion),
        riesgo: 'medio',
        liquidez: 'media',
        minimo_inversion: 1000,
        descripcion: dato.descripcion || `Obligación Negociable ${dato.ticker}`,
        fecha_emision: new Date().toISOString().split('T')[0],
        fecha_ultima_actualizacion: new Date().toISOString(),
        esta_activa: true,
      };
    });
}

/**
 * Detecta la moneda basada en la descripción
 */
function detectarMoneda(dato) {
  const texto = JSON.stringify(dato).toLowerCase();
  if (texto.includes('dolar') || texto.includes('usd') || texto.includes('mep')) return 'USD_MEP';
  if (texto.includes('peso') || texto.includes('ars') || texto.includes('$')) return 'ARS';
  return 'USD_MEP';
}

/**
 * Detecta el sector basado en la descripción
 */
function detectarSector(descripcion) {
  if (!descripcion) return 'No especificado';
  
  const texto = descripcion.toLowerCase();
  if (texto.includes('energía') || texto.includes('electricidad') || texto.includes('petro')) return 'Energía';
  if (texto.includes('banco') || texto.includes('financiero')) return 'Financiero';
  if (texto.includes('telecom')) return 'Telecomunicaciones';
  if (texto.includes('aluminio') || texto.includes('industria')) return 'Industria';
  if (texto.includes('gas') || texto.includes('petróleo')) return 'Oil & Gas';
  
  return 'No especificado';
}

/**
 * Calcula una fecha de vencimiento típica
 */
function calcularVencimiento() {
  const fecha = new Date();
  fecha.setFullYear(fecha.getFullYear() + 3);
  return fecha.toISOString().split('T')[0];
}

/**
 * Guarda los datos en JSON
 */
function guardarDatos(datos) {
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'inversiones-scraped.json');
  
  const dataToSave = {
    ultimaActualizacion: new Date().toISOString(),
    fuente: 'BYMADATA',
    total: datos.length,
    inversiones: datos,
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(dataToSave, null, 2));
  console.log(`\n💾 Datos guardados en: ${outputPath}`);
}

/**
 * Función principal
 */
async function main() {
  try {
    const datosCrudos = await scrapeBymadata();
    const datosTransformados = transformarDatos(datosCrudos);
    
    if (datosTransformados.length > 0) {
      guardarDatos(datosTransformados);
      console.log('\n✅ Scraping completado exitosamente');
      console.log(`📈 Total de inversiones: ${datosTransformados.length}`);
      
      // Mostrar primeros 3 resultados
      console.log('\n📝 Primeros resultados:');
      datosTransformados.slice(0, 3).forEach((inv, i) => {
        console.log(`  ${i + 1}. ${inv.ticker} - ${inv.tasa_anual}%`);
      });
    } else {
      console.log('\n⚠️  No se encontraron datos');
      console.log('Posibles causas:');
      console.log('  - BYMADATA requiere autenticación');
      console.log('  - La estructura de la página cambió');
      console.log('  - Hay protección anti-scraping');
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Ejecutar
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { scrapeBymadata, transformarDatos };
