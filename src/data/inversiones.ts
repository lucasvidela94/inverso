import type { Inversion } from '../types';

export const inversionesMock: Inversion[] = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
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
    id: '6',
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
];

export function getInversiones(): Inversion[] {
  return inversionesMock.filter(i => i.esta_activa);
}

export function getInversionByTicker(ticker: string): Inversion | undefined {
  return inversionesMock.find(i => i.ticker.toLowerCase() === ticker.toLowerCase());
}

export function getTopByRendimiento(limit = 5): Inversion[] {
  return [...inversionesMock]
    .filter(i => i.esta_activa)
    .sort((a, b) => b.rendimiento_ytm - a.rendimiento_ytm)
    .slice(0, limit);
}

export function getTopBySeguridad(limit = 5): Inversion[] {
  const calificacionOrden = { 'AAA': 6, 'AA': 5, 'A': 4, 'BBB': 3, 'BB': 2, 'B': 1, 'NR': 0 };
  return [...inversionesMock]
    .filter(i => i.esta_activa)
    .sort((a, b) => {
      const diff = calificacionOrden[b.calificacion] - calificacionOrden[a.calificacion];
      if (diff !== 0) return diff;
      return b.rendimiento_ytm - a.rendimiento_ytm;
    })
    .slice(0, limit);
}

export function getTopByLiquidez(limit = 5): Inversion[] {
  const liquidezOrden = { 'alta': 3, 'media': 2, 'baja': 1 };
  return [...inversionesMock]
    .filter(i => i.esta_activa)
    .sort((a, b) => {
      const diff = liquidezOrden[b.liquidez] - liquidezOrden[a.liquidez];
      if (diff !== 0) return diff;
      return b.rendimiento_ytm - a.rendimiento_ytm;
    })
    .slice(0, limit);
}

export function formatMoneda(valor: number, moneda: string): string {
  if (moneda === 'ARS') {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor);
  }
  return `U$S ${valor.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatPorcentaje(valor: number): string {
  return `${valor.toFixed(1)}%`;
}

export function formatFecha(fecha: string): string {
  return new Date(fecha).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
