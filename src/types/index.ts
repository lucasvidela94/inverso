export interface Inversion {
  id: string;
  ticker: string;
  nombre: string;
  emisor: string;
  tipo: 'obligacion_negociable' | 'titulo_publico' | 'caucion' | 'fondo';
  moneda: 'ARS' | 'USD' | 'USD_MEP';
  tasa_anual: number;
  plazo_dias: number;
  plazo_meses: number;
  amortizacion: 'bullet' | 'francesa' | 'americana';
  frecuencia_pagos: 'mensual' | 'bimestral' | 'trimestral' | 'semestral' | 'anual' | 'al_vencimiento';
  calificacion: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'NR';
  calificadora: string;
  sector: string;
  vencimiento: string;
  precio_actual: number;
  valor_nominal: number;
  rendimiento_ytm: number;
  riesgo: 'bajo' | 'medio' | 'alto';
  liquidez: 'alta' | 'media' | 'baja';
  minimo_inversion: number;
  descripcion?: string;
  garantia?: string;
  soporte?: string;
  fecha_emision: string;
  fecha_ultima_actualizacion: string;
  esta_activa: boolean;
}

export interface Filtros {
  moneda?: string;
  riesgo?: string;
  plazo?: string;
  calificacion?: string;
  sector?: string;
  busqueda?: string;
}

export type Vista = 'rendimiento' | 'seguridad' | 'liquidez';
