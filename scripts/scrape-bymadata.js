#!/usr/bin/env node
/**
 * Script de scraping de datos de inversiones desde BYMADATA
 * 
 * Este script extrae datos de Obligaciones Negociables y otros instrumentos
 * desde la plataforma BYMADATA de BYMA.
 * 
 * Uso: node scripts/scrape-bymadata.js
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URLs de BYMADATA
const BYMADATA_URLS = {
  on: 'https://open.bymadata.com.ar/#/dashboard',
  rentaFija: 'https://open.bymadata.com.ar/#/renta-fija',
};

/**
 * Extrae datos de Obligaciones Negociables desde BYMADATA
 */
async function scrapeObligacionesNegociables() {
  console.log('Iniciando scraping de BYMADATA...');
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--ignore-certificate-errors']
  });
  
  try {
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    // Navegar a la página de renta fija
    console.log('Navegando a BYMADATA Renta Fija...');
    await page.goto(BYMADATA_URLS.rentaFija, {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    // Esperar a que cargue la tabla
    console.log('Esperando carga de datos...');
    await page.waitForTimeout(5000);
    
    // Intentar extraer datos de la tabla
    const datos = await page.evaluate(() => {
      const filas = document.querySelectorAll('table tbody tr');
      const resultado = [];
      
      filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        if (celdas.length >= 5) {
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
    });
    
    console.log(`Extraídas ${datos.length} filas de datos`);
    
    // Si no encontramos datos en la tabla, intentar buscar en otros elementos
    if (datos.length === 0) {
      console.log('No se encontraron datos en tablas, intentando otros selectores...');
      
      // Intentar encontrar datos en elementos con clases específicas
      const datosAlternativos = await page.evaluate(() => {
        // Buscar cualquier elemento que parezca contener datos de ON
        const elementos = document.querySelectorAll('[class*="row"], [class*="item"], [class*="data"]');
        return Array.from(elementos).map(el => ({
          texto: el.textContent?.trim() || '',
          clase: el.className
        })).slice(0, 20);
      });
      
      console.log('Elementos encontrados:', datosAlternativos);
    }
    
    return datos;
    
  } catch (error) {
    console.error('Error durante el scraping:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

/**
 * Transforma los datos crudos en el formato de INVERSO
 */
function transformarDatos(datosCrudos) {
  console.log('Transformando datos...');
  
  // Por ahora, si no hay datos reales, devolvemos un mensaje
  if (!datosCrudos || datosCrudos.length === 0) {
    console.log('No hay datos para transformar');
    return [];
  }
  
  return datosCrudos.map((dato, index) => ({
    id: `scraped-${index}`,
    ticker: dato.ticker || `UNKNOWN${index}`,
    nombre: dato.descripcion || 'Sin nombre',
    emisor: dato.descripcion?.split(' ')[0] || 'Desconocido',
    tipo: 'obligacion_negociable',
    moneda: 'USD_MEP', // Asumimos por defecto
    tasa_anual: parseFloat(dato.variacion) || 0,
    plazo_dias: 1095,
    plazo_meses: 36,
    amortizacion: 'bullet',
    frecuencia_pagos: 'semestral',
    calificacion: 'AA',
    calificadora: 'Fix SCR',
    sector: 'No especificado',
    vencimiento: new Date(Date.now() + 1095 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    precio_actual: parseFloat(dato.precio) || 100,
    valor_nominal: 100,
    rendimiento_ytm: parseFloat(dato.variacion) || 0,
    riesgo: 'medio',
    liquidez: 'media',
    minimo_inversion: 1000,
    descripcion: dato.descripcion || 'Sin descripción',
    fecha_emision: new Date().toISOString().split('T')[0],
    fecha_ultima_actualizacion: new Date().toISOString().split('T')[0],
    esta_activa: true,
  }));
}

/**
 * Guarda los datos en un archivo JSON
 */
function guardarDatos(datos) {
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'inversiones-scraped.json');
  
  const dataToSave = {
    ultimaActualizacion: new Date().toISOString(),
    fuente: 'BYMADATA',
    total: datos.length,
    inversiones: datos
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(dataToSave, null, 2));
  console.log(`Datos guardados en: ${outputPath}`);
}

/**
 * Función principal
 */
async function main() {
  try {
    console.log('='.repeat(60));
    console.log('SCRAPER DE BYMADATA - INVERSO');
    console.log('='.repeat(60));
    console.log();
    
    const datosCrudos = await scrapeObligacionesNegociables();
    const datosTransformados = transformarDatos(datosCrudos);
    
    if (datosTransformados.length > 0) {
      guardarDatos(datosTransformados);
      console.log();
      console.log('✅ Scraping completado exitosamente');
      console.log(`📊 Total de inversiones extraídas: ${datosTransformados.length}`);
    } else {
      console.log();
      console.log('⚠️  No se encontraron datos nuevos');
      console.log('Esto puede deberse a:');
      console.log('  - Cambios en la estructura de BYMADATA');
      console.log('  - Protección anti-scraping');
      console.log('  - La página requiere autenticación');
    }
    
  } catch (error) {
    console.error();
    console.error('❌ Error en el scraping:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { scrapeObligacionesNegociables, transformarDatos };
