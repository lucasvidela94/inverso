export interface Broker {
  id: string;
  nombre: string;
  sitio_web: string;
  comisiones: {
    mercado_nacional: string;
    mercado_internacional: string;
    cauciones: string;
  };
  plataformas: string[];
  atencion: string;
  requisitos: string;
  ventajas: string[];
  desventajas: string[];
  rating: number;
  opiniones: number;
  afiliado_url?: string;
}

export const brokers: Broker[] = [
  {
    id: 'balanz',
    nombre: 'Balanz',
    sitio_web: 'https://www.balanz.com',
    comisiones: {
      mercado_nacional: '0.5% + IVA',
      mercado_internacional: '0.6% + IVA',
      cauciones: '0.25% + IVA',
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
      'Comisiones medias-altas',
      'Mínimos de inversión elevados para algunos productos',
    ],
    rating: 4.5,
    opiniones: 1250,
  },
  {
    id: 'iol',
    nombre: 'InvertirOnline',
    sitio_web: 'https://www.invertironline.com',
    comisiones: {
      mercado_nacional: '0.35% + IVA',
      mercado_internacional: '0.5% + IVA',
      cauciones: '0.15% + IVA',
    },
    plataformas: ['Web', 'App iOS', 'App Android'],
    atencion: 'Telefónica, email, chat',
    requisitos: 'DNI, CUIT, CBU',
    ventajas: [
      'Comisiones competitivas',
      'Plataforma intuitiva',
      'Buena para principiantes',
      'Mínimos bajos',
    ],
    desventajas: [
      'Atención al cliente puede ser lenta',
      'Menos research que otros',
    ],
    rating: 4.2,
    opiniones: 2100,
  },
  {
    id: 'ppi',
    nombre: 'PPI',
    sitio_web: 'https://www.ppi.com.ar',
    comisiones: {
      mercado_nacional: '0.4% + IVA',
      mercado_internacional: '0.55% + IVA',
      cauciones: '0.2% + IVA',
    },
    plataformas: ['Web', 'App iOS', 'App Android'],
    atencion: 'Telefónica, email, WhatsApp, sucursales',
    requisitos: 'DNI, CUIT, CBU',
    ventajas: [
      'Plataforma profesional',
      'Excelente research',
      'Sucursales físicas',
      'Buena para inversores avanzados',
    ],
    desventajas: [
      'Puede ser complejo para novatos',
      'Comisiones medias',
    ],
    rating: 4.4,
    opiniones: 980,
  },
  {
    id: 'bullmarket',
    nombre: 'Bull Market Brokers',
    sitio_web: 'https://www.bullmarketbrokers.com',
    comisiones: {
      mercado_nacional: '0.3% + IVA',
      mercado_internacional: '0.45% + IVA',
      cauciones: '0.15% + IVA',
    },
    plataformas: ['Web', 'App iOS', 'App Android'],
    atencion: 'Telefónica, email, chat',
    requisitos: 'DNI, CUIT, CBU',
    ventajas: [
      'Comisiones bajas',
      'Buena plataforma',
      'Ideal para traders',
      'Mínimos bajos',
    ],
    desventajas: [
      'Menos opciones de inversión',
      'Atención limitada',
    ],
    rating: 4.0,
    opiniones: 750,
  },
  {
    id: 'allaria',
    nombre: 'Allaria Ledesma',
    sitio_web: 'https://www.allaria.com.ar',
    comisiones: {
      mercado_nacional: '0.45% + IVA',
      mercado_internacional: '0.6% + IVA',
      cauciones: '0.2% + IVA',
    },
    plataformas: ['Web', 'App'],
    atencion: 'Telefónica, email, sucursales',
    requisitos: 'DNI, CUIT, CBU',
    ventajas: [
      'Broker tradicional sólido',
      'Buen research',
      'Sucursales en todo el país',
    ],
    desventajas: [
      'Plataforma menos moderna',
      'Comisiones altas',
    ],
    rating: 4.1,
    opiniones: 620,
  },
];

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
