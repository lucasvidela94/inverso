import { createSignal, Show, For, createMemo } from 'solid-js';
import { useParams, A } from '@solidjs/router';
import { useInversion } from '../hooks/useInversiones';
import { getBrokers } from '../data/brokers';
import { formatPorcentaje, formatMoneda, formatFecha } from '../data/inversiones';

export default function Detalle() {
  const params = useParams();
  const ticker = () => params.ticker;
  const inversionQuery = useInversion(ticker);
  
  const [monto, setMonto] = createSignal(10000);

  // Proyección de rendimiento
  const proyeccion = createMemo(() => {
    const inv = inversionQuery.data;
    if (!inv) return null;
    
    const interesAnual = monto() * (inv.tasa_anual / 100);
    const totalIntereses = interesAnual * (inv.plazo_meses / 12);
    const total = monto() + totalIntereses;
    
    return {
      interesAnual,
      totalIntereses,
      total,
      retorno: (totalIntereses / monto()) * 100,
    };
  });

  // Color según riesgo
  const colorRiesgo = createMemo(() => {
    const inv = inversionQuery.data;
    if (!inv) return '';
    switch (inv.riesgo) {
      case 'bajo': return 'text-emerald-700 bg-emerald-50';
      case 'medio': return 'text-amber-700 bg-amber-50';
      case 'alto': return 'text-rose-700 bg-rose-50';
      default: return '';
    }
  });

  return (
    <Show
      when={!inversionQuery.isLoading && inversionQuery.data}
      keyed
      fallback={
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="text-center">
             <h1 class="font-serif text-2xl font-medium text-stone-900 mb-4">
               {inversionQuery.isLoading ? 'Cargando...' : 'Inversión no encontrada'}
             </h1>
             <p class="text-stone-600 mb-4">
               Ticker: {ticker() || 'no disponible'}
             </p>
             <A href="/explorar" class="text-stone-600 hover:text-stone-900">
               Volver al explorador
             </A>
           </div>
         </div>
       }
     >
       {(inv) => {
         
         return (
          <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div class="mb-8">
              <A href="/explorar" class="text-sm text-stone-500 hover:text-stone-900 mb-4 inline-block">
                ← Volver
              </A>
              
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 class="font-serif text-4xl font-medium text-stone-900 mb-2">
                    {inv.emisor}
                  </h1>
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="text-stone-500">{inv.ticker}</span>
                    <span class="text-stone-300">·</span>
                    <span class="text-stone-500">{inv.sector}</span>
                  </div>
                </div>
                
                <div class="text-right">
                  <div class="font-serif text-4xl font-medium text-emerald-700">
                    {inv.tasa_anual ? formatPorcentaje(inv.tasa_anual) : 'N/A'}
                  </div>
                  <div class="text-sm text-stone-500">TNA</div>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div class="grid md:grid-cols-3 gap-6 mb-8">
              <div class="p-6 bg-white border border-stone-200 rounded-lg">
                <div class="text-sm text-stone-500 mb-1">Calificación</div>
                <div class="font-serif text-2xl font-medium text-stone-900">
                  {inv.calificacion}
                </div>
                <div class="text-sm text-stone-400">{inv.calificadora}</div>
              </div>

              <div class="p-6 bg-white border border-stone-200 rounded-lg">
                <div class="text-sm text-stone-500 mb-1">Plazo</div>
                <div class="font-serif text-2xl font-medium text-stone-900">
                  {inv.plazo_meses} meses
                </div>
                <div class="text-sm text-stone-400">Vence {formatFecha(inv.vencimiento)}</div>
              </div>

              <div class="p-6 bg-white border border-stone-200 rounded-lg">
                <div class="text-sm text-stone-500 mb-1">Inversión mínima</div>
                <div class="font-serif text-2xl font-medium text-stone-900">
                  {formatMoneda(inv.minimo_inversion, inv.moneda)}
                </div>
                <div class="text-sm text-stone-400">{inv.moneda === 'ARS' ? 'Pesos' : 'Dólares'}</div>
              </div>
            </div>

            {/* Detalles */}
            <div class="grid md:grid-cols-2 gap-8 mb-8">
              <div class="p-6 bg-white border border-stone-200 rounded-lg">
                <h2 class="font-serif text-xl font-medium text-stone-900 mb-4">Detalles</h2>
                
                <dl class="space-y-3">
                  <div class="flex justify-between">
                    <dt class="text-stone-500">Tipo</dt>
                    <dd class="font-medium">Obligación Negociable</dd>
                  </div>
                  
                  <div class="flex justify-between">
                    <dt class="text-stone-500">Moneda</dt>
                    <dd class="font-medium">{inv.moneda}</dd>
                  </div>
                  
                  <div class="flex justify-between">
                    <dt class="text-stone-500">Amortización</dt>
                    <dd class="font-medium capitalize">{inv.amortizacion}</dd>
                  </div>
                  
                  <div class="flex justify-between">
                    <dt class="text-stone-500">Frecuencia de pagos</dt>
                    <dd class="font-medium capitalize">{inv.frecuencia_pagos}</dd>
                  </div>
                  
                  <div class="flex justify-between">
                    <dt class="text-stone-500">Riesgo</dt>
                    <dd class="font-medium capitalize">{inv.riesgo}</dd>
                  </div>
                  
                  <div class="flex justify-between">
                    <dt class="text-stone-500">Liquidez</dt>
                    <dd class="font-medium capitalize">{inv.liquidez}</dd>
                  </div>
                  
                  {inv.soporte && (
                    <div class="flex justify-between">
                      <dt class="text-stone-500">Soporte</dt>
                      <dd class="font-medium">{inv.soporte}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Calculadora */}
              <div class="p-6 bg-white border border-stone-200 rounded-lg">
                <h2 class="font-serif text-xl font-medium text-stone-900 mb-4">Calculadora</h2>
                
                <div class="mb-6">
                  <label class="block text-sm text-stone-600 mb-2">
                    Monto a invertir ({inv.moneda === 'ARS' ? '$' : 'U$S'})
                  </label>
                  <input
                    type="number"
                    min={inv.minimo_inversion}
                    value={monto()}
                    onInput={(e) => setMonto(Number(e.currentTarget.value))}
                    class="w-full px-4 py-3 text-lg bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>

                <div class="space-y-3 pt-4 border-t border-stone-200">
                  <div class="flex justify-between">
                    <span class="text-stone-600">Interés anual</span>
                    <span class="font-medium">
                      {formatMoneda(proyeccion()?.interesAnual || 0, inv.moneda)}
                    </span>
                  </div>
                  
                  <div class="flex justify-between">
                    <span class="text-stone-600">Total intereses ({inv.plazo_meses} meses)</span>
                    <span class="font-medium text-emerald-700">
                      {formatMoneda(proyeccion()?.totalIntereses || 0, inv.moneda)}
                    </span>
                  </div>
                  
                  <div class="flex justify-between pt-3 border-t border-stone-200">
                    <span class="font-medium">Total al vencimiento</span>
                    <span class="font-serif text-xl font-medium text-emerald-700">
                      {formatMoneda(proyeccion()?.total || 0, inv.moneda)}
                    </span>
                  </div>
                  
                  <div class="flex justify-between text-sm">
                    <span class="text-stone-500">Retorno total</span>
                    <span class="text-emerald-700">
                      +{formatPorcentaje(proyeccion()?.retorno || 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div class="p-6 bg-stone-100 rounded-lg mb-8">
              <h2 class="font-serif text-xl font-medium text-stone-900 mb-3">Sobre esta inversión</h2>
              <p class="text-stone-700 leading-relaxed">
                {inv.descripcion}
              </p>
            </div>

            {/* Brokers */}
            <div class="mb-8">
              <h2 class="font-serif text-xl font-medium text-stone-900 mb-4">
                Disponible en estos brokers
              </h2>
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <For each={getBrokers()}>
                  {(broker) => (
                    <a
                      href={broker.sitio_web}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-between p-4 bg-white border border-stone-200 rounded-lg hover:border-stone-300 hover:shadow-sm transition-all"
                    >
                      <div>
                        <div class="font-medium text-stone-900">{broker.nombre}</div>
                        <div class="text-sm text-stone-500">
                          Comisión: {broker.comisiones.mercado_nacional}
                        </div>
                      </div>
                      <svg class="w-5 h-5 text-stone-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </a>
                  )}
                </For>
              </div>
              <p class="mt-4 text-sm text-stone-500">
                Los links pueden ser de afiliados. Esto no aumenta tu costo y nos ayuda a mantener INVERSO gratuito.
              </p>
            </div>

            {/* Disclaimer */}
            <div class="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p class="text-sm text-amber-800">
                Esta información es educativa y no constituye asesoramiento financiero.
                Las inversiones implican riesgos. Consultá con un asesor profesional antes de invertir.
              </p>
            </div>
          </div>
        );
      }}
    </Show>
  );
}
