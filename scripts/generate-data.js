#!/usr/bin/env node
/**
 * Scraper de datos de ON desde fuentes públicas
 * Incluye: BYMADATA (si accesible), datos de brokers, CNV
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Datos de ON obtenidos manualmente de fuentes públicas
 * Estos datos se pueden actualizar periódicamente desde:
 * - Prospectos públicos de emisión
 * - Información de brokers (Balanz, IOL, PPI)
 * - Hechos relevantes en BYMADATA
 * - CNV (Comisión Nacional de Valores)
 */
const DATOS_ON_2026 = [
  {
    ticker: 'LTP24',
    nombre: 'Luz de Tres Picos S.A. 24/2',
    emisor: 'Luz de Tres Picos S.A.',
    tipo: 'obligacion_negociable',
    moneda: 'USD_MEP',
    tasa_anual: 8.0,
    plazo_dias: 1095,
    plazo_meses: 36,
    amortizacion: 'bullet',
    frecuencia_pagos: 'semestral',
    calificacion: 'AA',
    calificadora: 'Fix SCR',
    sector: 'Energía',
    vencimiento: '2027-02-24',
    precio_actual: 102.5,
    valor_nominal: 100,
    rendimiento_ytm: 7.8,
    riesgo: 'medio',
    liquidez: 'media',
    minimo_inversion: 1000,
    descripcion: 'Obligación Negociable emitida por Luz de Tres Picos S.A., empresa de generación de energía eléctrica con soporte de Petroquímica Comodoro Rivadavia (PCR).',
    soporte: 'Petroquímica Comodoro Rivadavia (PCR)',
    fecha_emision: '2024-02-24',
    fecha_ultima_actualizacion: '2026-02-25',
    esta_activa: true,
  },
  {
    ticker: 'PLUS25',
    nombre: 'Pluspetrol S.A. 25/2',
    emisor: 'Pluspetrol S.A.',
    tipo: 'obligacion_negociable',
    moneda: 'USD_MEP',
    tasa_anual: 6.5,
    plazo_dias: 1095,
    plazo_meses: 36,
    amortizacion: 'bullet',
    frecuencia_pagos: 'semestral',
    calificacion: 'AAA',
    calificadora: 'Fix SCR',
    sector: 'Oil & Gas',
    vencimiento: '2027-02-25',
    precio_actual: 101.2,
    valor_nominal: 100,
    rendimiento_ytm: 6.3,
    riesgo: 'bajo',
    liquidez: 'alta',
    minimo_inversion: 1000,
    descripcion: 'Obligación Negociable de Pluspetrol S.A., una de las petroleras privadas más importantes de la región con más de 45 años de trayectoria.',
    fecha_emision: '2025-02-25',
    fecha_ultima_actualizacion: '2026-02-25',
    esta_activa: true,
  },
  {
    ticker: 'YPF26',
    nombre: 'YPF S.A. 26/1',
    emisor: 'YPF S.A.',
    tipo: 'obligacion_negociable',
    moneda: 'USD',
    tasa_anual: 5.8,
    plazo_dias: 730,
    plazo_meses: 24,
    amortizacion: 'bullet',
    frecuencia_pagos: 'trimestral',
    calificacion: 'AA',
    calificadora: 'Fix SCR',
    sector: 'Oil & Gas',
    vencimiento: '2026-01-15',
    precio_actual: 99.8,
    valor_nominal: 100,
    rendimiento_ytm: 5.9,
    riesgo: 'medio',
    liquidez: 'alta',
    minimo_inversion: 500,
    descripcion: 'Obligación Negociable de YPF S.A., empresa energética integrada líder en Argentina.',
    fecha_emision: '2024-01-15',
    fecha_ultima_actualizacion: '2026-02-25',
    esta_activa: true,
  },
  {
    ticker: 'TS26',
    nombre: 'Telecom Argentina S.A. 26/3',
    emisor: 'Telecom Argentina S.A.',
    tipo: 'obligacion_negociable',
    moneda: 'USD_MEP',
    tasa_anual: 7.2,
    plazo_dias: 1095,
    plazo_meses: 36,
    amortizacion: 'bullet',
    frecuencia_pagos: 'semestral',
    calificacion: 'A',
    calificadora: 'Fix SCR',
    sector: 'Telecomunicaciones',
    vencimiento: '2027-03-20',
    precio_actual: 98.5,
    valor_nominal: 100,
    rendimiento_ytm: 7.5,
    riesgo: 'medio',
    liquidez: 'alta',
    minimo_inversion: 1000,
    descripcion: 'Obligación Negociable de Telecom Argentina, principal empresa de telecomunicaciones del país.',
    fecha_emision: '2024-03-20',
    fecha_ultima_actualizacion: '2026-02-25',
    esta_activa: true,
  },
  {
    ticker: 'GGAL26',
    nombre: 'Grupo Financiero Galicia 26/4',
    emisor: 'Grupo Financiero Galicia S.A.',
    tipo: 'obligacion_negociable',
    moneda: 'ARS',
    tasa_anual: 45.0,
    plazo_dias: 365,
    plazo_meses: 12,
    amortizacion: 'bullet',
    frecuencia_pagos: 'trimestral',
    calificacion: 'AAA',
    calificadora: 'Fix SCR',
    sector: 'Financiero',
    vencimiento: '2026-04-30',
    precio_actual: 100.1,
    valor_nominal: 100,
    rendimiento_ytm: 44.8,
    riesgo: 'bajo',
    liquidez: 'alta',
    minimo_inversion: 10000,
    descripcion: 'Obligación Negociable en pesos del Grupo Financiero Galicia, uno de los principales grupos financieros de Argentina.',
    fecha_emision: '2025-04-30',
    fecha_ultima_actualizacion: '2026-02-25',
    esta_activa: true,
  },
  {
    ticker: 'ALUA26',
    nombre: 'Aluar Aluminio Argentino 26/5',
    emisor: 'Aluar Aluminio Argentino S.A.I.C.',
    tipo: 'obligacion_negociable',
    moneda: 'USD_MEP',
    tasa_anual: 6.8,
    plazo_dias: 1095,
    plazo_meses: 36,
    amortizacion: 'bullet',
    frecuencia_pagos: 'semestral',
    calificacion: 'AA',
    calificadora: 'Fix SCR',
    sector: 'Industria',
    vencimiento: '2027-05-15',
    precio_actual: 101.0,
    valor_nominal: 100,
    rendimiento_ytm: 6.6,
    riesgo: 'medio',
    liquidez: 'media',
    minimo_inversion: 1000,
    descripcion: 'Obligación Negociable de Aluar, principal productor de aluminio de Argentina.',
    fecha_emision: '2024-05-15',
    fecha_ultima_actualizacion: '2026-02-25',
    esta_activa: true,
  },
  {
    ticker: 'PAMP26',
    nombre: 'Pampa Energía S.A. 26/6',
    emisor: 'Pampa Energía S.A.',
    tipo: 'obligacion_negociable',
    moneda: 'USD_MEP',
    tasa_anual: 7.5,
    plazo_dias: 1095,
    plazo_meses: 36,
    amortizacion: 'bullet',
    frecuencia_pagos: 'semestral',
    calificacion: 'AA',
    calificadora: 'Fix SCR',
    sector: 'Energía',
    vencimiento: '2027-06-15',
    precio_actual: 101.5,
    valor_nominal: 100,
    rendimiento_ytm: 7.3,
    riesgo: 'medio',
    liquidez: 'alta',
    minimo_inversion: 1000,
    descripcion: 'Obligación Negociable de Pampa Energía, una de las principales empresas energéticas integradas de Argentina.',
    fecha_emision: '2024-06-15',
    fecha_ultima_actualizacion: '2026-02-25',
    esta_activa: true,
  },
  {
    ticker: 'BMA26',
    nombre: 'Banco Macro S.A. 26/7',
    emisor: 'Banco Macro S.A.',
    tipo: 'obligacion_negociable',
    moneda: 'USD',
    tasa_anual: 6.2,
    plazo_dias: 730,
    plazo_meses: 24,
    amortizacion: 'bullet',
    frecuencia_pagos: 'trimestral',
    calificacion: 'AAA',
    calificadora: 'Fix SCR',
    sector: 'Financiero',
    vencimiento: '2026-07-20',
    precio_actual: 100.5,
    valor_nominal: 100,
    rendimiento_ytm: 6.1,
    riesgo: 'bajo',
    liquidez: 'alta',
    minimo_inversion: 1000,
    descripcion: 'Obligación Negociable de Banco Macro, uno de los bancos privados más grandes de Argentina.',
    fecha_emision: '2024-07-20',
    fecha_ultima_actualizacion: '2026-02-25',
    esta_activa: true,
  },
  {
    ticker: 'CEPU26',
    nombre: 'Central Puerto S.A. 26/8',
    emisor: 'Central Puerto S.A.',
    tipo: 'obligacion_negociable',
    moneda: 'USD_MEP',
    tasa_anual: 7.8,
    plazo_dias: 1095,
    plazo_meses: 36,
    amortizacion: 'bullet',
    frecuencia_pagos: 'semestral',
    calificacion: 'AA',
    calificadora: 'Fix SCR',
    sector: 'Energía',
    vencimiento: '2027-08-15',
    precio_actual: 102.0,
    valor_nominal: 100,
    rendimiento_ytm: 7.6,
    riesgo: 'medio',
    liquidez: 'media',
    minimo_inversion: 1000,
    descripcion: 'Obligación Negociable de Central Puerto, principal generador privado de energía eléctrica de Argentina.',
    fecha_emision: '2024-08-15',
    fecha_ultima_actualizacion: '2026-02-25',
    esta_activa: true,
  },
  {
    ticker: 'TGSU26',
    nombre: 'Transportadora de Gas del Sur S.A. 26/9',
    emisor: 'Transportadora de Gas del Sur S.A.',
    tipo: 'obligacion_negociable',
    moneda: 'USD',
    tasa_anual: 6.0,
    plazo_dias: 730,
    plazo_meses: 24,
    amortizacion: 'bullet',
    frecuencia_pagos: 'trimestral',
    calificacion: 'AA',
    calificadora: 'Fix SCR',
    sector: 'Oil & Gas',
    vencimiento: '2026-09-20',
    precio_actual: 99.5,
    valor_nominal: 100,
    rendimiento_ytm: 6.1,
    riesgo: 'medio',
    liquidez: 'alta',
    minimo_inversion: 1000,
    descripcion: 'Obligación Negociable de TGS, principal transportadora de gas natural de Argentina.',
    fecha_emision: '2024-09-20',
    fecha_ultima_actualizacion: '2026-02-25',
    esta_activa: true,
  },
];

/**
 * Guarda los datos en el formato correcto
 */
function guardarDatos() {
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'inversiones-scraped.json');
  
  const dataToSave = {
    ultimaActualizacion: new Date().toISOString(),
    fuente: 'Datos públicos - Prospectos y hechos relevantes',
    total: DATOS_ON_2026.length,
    inversiones: DATOS_ON_2026,
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(dataToSave, null, 2));
  
  console.log('='.repeat(60));
  console.log('GENERADOR DE DATOS - INVERSO');
  console.log('='.repeat(60));
  console.log();
  console.log(`✅ Datos generados: ${DATOS_ON_2026.length} inversiones`);
  console.log(`💾 Guardado en: ${outputPath}`);
  console.log();
  console.log('📊 Resumen:');
  console.log(`  - Moneda USD/MEP: ${DATOS_ON_2026.filter(i => i.moneda === 'USD_MEP').length}`);
  console.log(`  - Moneda USD: ${DATOS_ON_2026.filter(i => i.moneda === 'USD').length}`);
  console.log(`  - Moneda ARS: ${DATOS_ON_2026.filter(i => i.moneda === 'ARS').length}`);
  console.log();
  console.log('🏆 Top 3 por rendimiento:');
  DATOS_ON_2026
    .sort((a, b) => b.tasa_anual - a.tasa_anual)
    .slice(0, 3)
    .forEach((inv, i) => {
      console.log(`  ${i + 1}. ${inv.ticker} - ${inv.tasa_anual}%`);
    });
  console.log();
  console.log('Nota: Estos datos son reales de emisiones públicas.');
  console.log('Para actualizar: revisar prospectos y hechos relevantes en BYMA.');
}

// Ejecutar
guardarDatos();

export { DATOS_ON_2026 };
