export interface Broker {
  id: string;
  nombre: string;
  sitio_web: string;
  // Comisiones base para cálculos (sin IVA, en formato decimal)
  comisiones_base: {
    acciones_cedears: number; // 0.005 = 0.5%
    titulos_publicos: number;
    opciones: number;
    cauciones_colocadora: number;
    cauciones_tomadora: number;
    fci: number; // generalmente 0
  };
  // Texto formateado para mostrar en UI
  comisiones_display: {
    mercado_nacional: string;
    mercado_internacional: string;
    cauciones: string;
  };
  // Estructura de comisiones por tipo de cuenta (si aplica)
  niveles?: {
    nombre: string;
    requisito: string;
    comisiones: {
      acciones_cedears: number;
      titulos_publicos: number;
      opciones: number;
    };
  }[];
  plataformas: string[];
  atencion: string;
  requisitos: string;
  ventajas: string[];
  desventajas: string[];
  notas?: string;
}

export const brokers: Broker[] = [
  {
    id: 'iol',
    nombre: 'InvertirOnline',
    sitio_web: 'https://www.invertironline.com',
    comisiones_base: {
      acciones_cedears: 0.005, // 0.5% base (Gold)
      titulos_publicos: 0.005,
      opciones: 0.005,
      cauciones_colocadora: 0.0015, // 0.15%
      cauciones_tomadora: 0.003, // 0.30%
      fci: 0,
    },
    comisiones_display: {
      mercado_nacional: '0.5% + IVA (Gold)',
      mercado_internacional: '0.5% + IVA (Gold)',
      cauciones: '0.15% + IVA (colocadora)',
    },
    niveles: [
      {
        nombre: 'Gold',
        requisito: 'Hasta $7.5M mensual',
        comisiones: { acciones_cedears: 0.005, titulos_publicos: 0.005, opciones: 0.005 }
      },
      {
        nombre: 'Platinum',
        requisito: '$7.5M - $50M mensual',
        comisiones: { acciones_cedears: 0.003, titulos_publicos: 0.003, opciones: 0.003 }
      },
      {
        nombre: 'Black',
        requisito: 'Más de $50M mensual',
        comisiones: { acciones_cedears: 0.001, titulos_publicos: 0.001, opciones: 0.001 }
      },
    ],
    plataformas: ['Web', 'App iOS', 'App Android'],
    atencion: 'Telefónica, email, chat',
    requisitos: 'DNI, CUIT, CBU',
    ventajas: [
      'Sin costo de apertura y mantenimiento',
      'Tarifas especiales por volumen operado',
      'Research y análisis exclusivos',
      'API disponible para clientes',
    ],
    desventajas: [
      'Comisiones base más altas que algunos competidores',
      'Atención al cliente puede ser lenta en momentos de alta demanda',
    ],
    notas: 'Las comisiones varían según el volumen operado mensual.'
  },
  {
    id: 'ppi',
    nombre: 'PPI (Portfolio Personal)',
    sitio_web: 'https://www.portfoliopersonal.com',
    comisiones_base: {
      acciones_cedears: 0.006, // 0.6%
      titulos_publicos: 0.006,
      opciones: 0.01, // 1%
      cauciones_colocadora: 0.02, // 2% anual
      cauciones_tomadora: 0, // ND - No disponible
      fci: 0,
    },
    comisiones_display: {
      mercado_nacional: '0.6% + IVA',
      mercado_internacional: '0.6% + IVA',
      cauciones: '2% + IVA anual (colocadora)',
    },
    plataformas: ['Web', 'App iOS', 'App Android'],
    atencion: 'Telefónica, email, WhatsApp, sucursales',
    requisitos: 'DNI, CUIT, CBU',
    ventajas: [
      'Plataforma profesional con research propio',
      'Sucursales físicas en todo el país',
      'Excelente para inversores avanzados',
      'Operatoria intradiaria bonificada',
    ],
    desventajas: [
      'Comisiones más altas que la competencia',
      'Puede ser complejo para principiantes',
      'Cauciones con comisión elevada (2% anual)',
    ],
  },
  {
    id: 'balanz',
    nombre: 'Balanz',
    sitio_web: 'https://www.balanz.com',
    comisiones_base: {
      acciones_cedears: 0, // Variable - consultar
      titulos_publicos: 0,
      opciones: 0,
      cauciones_colocadora: 0,
      cauciones_tomadora: 0,
      fci: 0,
    },
    comisiones_display: {
      mercado_nacional: 'Consultar en sitio oficial',
      mercado_internacional: 'Consultar en sitio oficial',
      cauciones: 'Consultar en sitio oficial',
    },
    plataformas: ['Web', 'App iOS', 'App Android'],
    atencion: 'Telefónica, email, WhatsApp',
    requisitos: 'DNI, CUIT, CBU, Factura de servicio',
    ventajas: [
      'Plataforma muy completa',
      'Buena atención al cliente',
      'Acceso a mercado primario',
      'Research propio',
    ],
    desventajas: [
      'Comisiones variables según el cliente',
      'Mínimos de inversión elevados para algunos productos',
    ],
    notas: 'Las comisiones son negociables según el perfil del cliente. Se recomienda consultar directamente.'
  },
  {
    id: 'bullmarket',
    nombre: 'Bull Market Brokers',
    sitio_web: 'https://www.bullmarketbrokers.com',
    comisiones_base: {
      acciones_cedears: 0.005, // 0.5% Digital Account (base)
      titulos_publicos: 0.005,
      opciones: 0.005,
      cauciones_colocadora: 0, // No especificado
      cauciones_tomadora: 0,
      fci: 0,
    },
    comisiones_display: {
      mercado_nacional: '0.10% - 0.50% + IVA',
      mercado_internacional: 'Consultar en sitio oficial',
      cauciones: 'Consultar en sitio oficial',
    },
    niveles: [
      {
        nombre: 'Digital Account',
        requisito: 'Sin requisitos',
        comisiones: { acciones_cedears: 0.005, titulos_publicos: 0.005, opciones: 0.005 }
      },
      {
        nombre: 'Active Trader',
        requisito: '>$5M mensual',
        comisiones: { acciones_cedears: 0.0025, titulos_publicos: 0.0025, opciones: 0.0025 }
      },
      {
        nombre: 'Active Trader Plus',
        requisito: '>$25M mensual',
        comisiones: { acciones_cedears: 0.001, titulos_publicos: 0.001, opciones: 0.001 }
      },
      {
        nombre: 'Wealth Management',
        requisito: '>USD 100.000',
        comisiones: { acciones_cedears: 0.004, titulos_publicos: 0.004, opciones: 0.004 }
      },
      {
        nombre: 'Wealth Premium',
        requisito: '>USD 250.000',
        comisiones: { acciones_cedears: 0.0025, titulos_publicos: 0.0025, opciones: 0.0025 }
      },
    ],
    plataformas: ['Web', 'App iOS', 'App Android'],
    atencion: 'Telefónica, email, chat',
    requisitos: 'DNI, CUIT, CBU',
    ventajas: [
      'Agente Fintech Nº1 de Argentina',
      'Inteligencia artificial para detectar perfil del inversor',
      'Supermercado de Fondos Comunes más grande del país',
      'Charlas online y presenciales con analistas',
      'FCI sin costo',
    ],
    desventajas: [
      'Comisiones variables según tipo de cuenta',
      'Atención limitada según algunos usuarios',
    ],
    notas: 'Comisiones desde 0.10% (Active Trader Plus) hasta 0.50% (Digital Account). Trading intradiario con 50% de bonificación.'
  },
  {
    id: 'allaria',
    nombre: 'Allaria Ledesma',
    sitio_web: 'https://www.allaria.com.ar',
    comisiones_base: {
      acciones_cedears: 0.005, // hasta 0.5%
      titulos_publicos: 0.0025, // hasta 0.25%
      opciones: 0.006, // hasta 0.6%
      cauciones_colocadora: 0.002, // 0.2% (30 días)
      cauciones_tomadora: 0.004, // 0.4% (30 días)
      fci: 0,
    },
    comisiones_display: {
      mercado_nacional: 'hasta 0.50% + IVA',
      mercado_internacional: 'hasta 1.50% + IVA',
      cauciones: 'hasta 0.20% + IVA (colocadora)',
    },
    niveles: [
      {
        nombre: 'Autogestión (Online)',
        requisito: 'Operatoria web',
        comisiones: { acciones_cedears: 0.005, titulos_publicos: 0.0025, opciones: 0.006 }
      },
      {
        nombre: 'Asistida',
        requisito: 'Con asesor comercial',
        comisiones: { acciones_cedears: 0.015, titulos_publicos: 0.015, opciones: 0.025 }
      },
    ],
    plataformas: ['Web', 'App'],
    atencion: 'Telefónica, email, sucursales',
    requisitos: 'DNI, CUIT, CBU',
    ventajas: [
      'Broker tradicional sólido con más de 24.000 clientes',
      'Excelente research y análisis de mercado',
      'Sucursales en todo el país',
      'Informes diarios y semanales gratuitos',
      'FCI sin costo de suscripción/rescate',
    ],
    desventajas: [
      'Plataforma menos moderna que competidores',
      'Comisiones más altas para operatoria asistida',
      'Custodia de títulos: $35 mensual por especie',
    ],
    notas: 'Comisiones online: Acciones hasta 0.50%, Títulos Públicos hasta 0.25%, Opciones hasta 0.60%. Con asesor: hasta 1.50% + IVA.'
  },
];

// Función para calcular comisión según monto y broker
export function calcularComision(
  brokerId: string,
  tipoInstrumento: 'acciones_cedears' | 'titulos_publicos' | 'opciones',
  monto: number,
  volumenMensual?: number
): number {
  const broker = brokers.find(b => b.id === brokerId);
  if (!broker) return 0;

  // Si tiene niveles, determinar cuál aplica
  if (broker.niveles && volumenMensual !== undefined) {
    // IOL: por volumen
    if (broker.id === 'iol') {
      if (volumenMensual > 50000000) return monto * 0.001; // Black
      if (volumenMensual > 7500000) return monto * 0.003; // Platinum
      return monto * 0.005; // Gold
    }
    // Bull Market: por volumen
    if (broker.id === 'bullmarket') {
      if (volumenMensual > 25000000) return monto * 0.001; // Active Trader Plus
      if (volumenMensual > 5000000) return monto * 0.0025; // Active Trader
      return monto * 0.005; // Digital Account
    }
  }

  // Comisión base
  return monto * broker.comisiones_base[tipoInstrumento];
}

export function getBrokers(): Broker[] {
  return brokers;
}

export function getBrokerById(id: string): Broker | undefined {
  return brokers.find(b => b.id === id);
}

export function getBrokersByInversion(inversionTicker: string): Broker[] {
  // En el futuro esto filtraría brokers que ofrecen esa inversión específica
  return brokers;
}
