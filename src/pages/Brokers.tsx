import { For, createSignal, createMemo } from 'solid-js';
import { A } from '@solidjs/router';
import { getBrokers } from '../data/brokers';
import type { Broker } from '../data/brokers';



function BrokerCard(props: { broker: Broker }) {
  const [expandido, setExpandido] = createSignal(false);
  
  return (
    <div class="bg-white border border-stone-200 rounded-lg overflow-hidden">
      <div class="p-6">
        <div class="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 class="font-serif text-xl font-medium text-stone-900">
              {props.broker.nombre}
            </h3>
            {props.broker.notas && (
              <div class="mt-1 text-sm text-amber-600">
                {props.broker.notas}
              </div>
            )}
          </div>
          
          <a
            href={props.broker.sitio_web}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            Visitar sitio
          </a>
        </div>
        
        <div class="grid sm:grid-cols-3 gap-4 mb-4">
          <div class="p-3 bg-stone-50 rounded">
            <div class="text-xs text-stone-500 mb-1">Mercado Nacional</div>
            <div class="font-medium text-stone-900">{props.broker.comisiones_display.mercado_nacional}</div>
          </div>
          
          <div class="p-3 bg-stone-50 rounded">
            <div class="text-xs text-stone-500 mb-1">Mercado Internacional</div>
            <div class="font-medium text-stone-900">{props.broker.comisiones_display.mercado_internacional}</div>
          </div>
          
          <div class="p-3 bg-stone-50 rounded">
            <div class="text-xs text-stone-500 mb-1">Cauciones</div>
            <div class="font-medium text-stone-900">{props.broker.comisiones_display.cauciones}</div>
          </div>
        </div>
        
        <button
          onClick={() => setExpandido(!expandido())}
          class="text-sm text-stone-600 hover:text-stone-900 transition-colors"
        >
          {expandido() ? 'Ver menos' : 'Ver más detalles'}
        </button>
      </div>
      
      {expandido() && (
        <div class="px-6 pb-6 border-t border-stone-200 pt-4">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-medium text-stone-900 mb-2">Plataformas</h4>
              <p class="text-sm text-stone-600">{props.broker.plataformas.join(', ')}</p>
              
              <h4 class="font-medium text-stone-900 mb-2 mt-4">Atención al cliente</h4>
              <p class="text-sm text-stone-600">{props.broker.atencion}</p>
              
              <h4 class="font-medium text-stone-900 mb-2 mt-4">Requisitos</h4>
              <p class="text-sm text-stone-600">{props.broker.requisitos}</p>
            </div>
            
            <div>
              <h4 class="font-medium text-emerald-700 mb-2">Ventajas</h4>
              <ul class="space-y-1">
                <For each={props.broker.ventajas}>
                  {(ventaja) => (
                    <li class="text-sm text-stone-600 flex items-start gap-2">
                      <svg class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      {ventaja}
                    </li>
                  )}
                </For>
              </ul>
              
              <h4 class="font-medium text-rose-700 mb-2 mt-4">Desventajas</h4>
              <ul class="space-y-1">
                <For each={props.broker.desventajas}>
                  {(desventaja) => (
                    <li class="text-sm text-stone-600 flex items-start gap-2">
                      <svg class="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                      {desventaja}
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Brokers() {
  const brokers = createMemo(() => getBrokers());
  const [ordenarPor, setOrdenarPor] = createSignal('nombre');
  
  const brokersOrdenados = createMemo(() => {
    const b = [...brokers()];
    switch (ordenarPor()) {
      case 'comision':
        return b.sort((a, b) => {
          // Ordenar por comisión base de títulos públicos (ONs/bonos)
          return a.comisiones_base.titulos_publicos - b.comisiones_base.titulos_publicos;
        });
      case 'nombre':
        return b.sort((a, b) => a.nombre.localeCompare(b.nombre));
      default:
        return b;
    }
  });
  
  return (
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="font-serif text-4xl font-medium text-stone-900 mb-2">
              Brokers
            </h1>
            <p class="text-stone-600">
              Compará comisiones y elegí dónde operar
            </p>
          </div>
          
          <div class="flex items-center gap-2">
            <label class="text-sm text-stone-600">Ordenar por:</label>
            <select
              value={ordenarPor()}
              onChange={(e) => setOrdenarPor(e.currentTarget.value)}
              class="px-3 py-2 text-sm bg-white border border-stone-200 rounded focus:outline-none focus:ring-2 focus:ring-stone-900"
            >
              <option value="nombre">Nombre</option>
              <option value="comision">Menor comisión</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p class="text-sm text-amber-800">
          Las comisiones mostradas son las publicadas en los sitios oficiales de cada broker 
          y pueden variar según el volumen operado o el tipo de cliente. 
          Se recomienda verificar los valores actualizados directamente con cada broker antes de operar.
        </p>
      </div>
      
      <div class="grid gap-6">
        <For each={brokersOrdenados()}>
          {(broker) => <BrokerCard broker={broker} />}
        </For>
      </div>
      
      <section class="mt-16 pt-12 border-t border-stone-200">
        <h2 class="font-serif text-2xl font-medium text-stone-900 mb-6">
          ¿Cómo elegir un broker?
        </h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div class="p-6 bg-stone-100 rounded-lg">
            <div class="w-10 h-10 bg-stone-900 text-white rounded-full flex items-center justify-center font-serif text-lg mb-4">
              1
            </div>
            <h3 class="font-medium text-stone-900 mb-2">Compará comisiones</h3>
            <p class="text-sm text-stone-600">
              Las comisiones varían según el tipo de operación. Si vas a operar mucho, 
              elegí uno con comisiones bajas.
            </p>
          </div>
          
          <div class="p-6 bg-stone-100 rounded-lg">
            <div class="w-10 h-10 bg-stone-900 text-white rounded-full flex items-center justify-center font-serif text-lg mb-4">
              2
            </div>
            <h3 class="font-medium text-stone-900 mb-2">Mirá la plataforma</h3>
            <p class="text-sm text-stone-600">
              Algunas son más simples, otras más completas. Elegí una que se adapte 
              a tu nivel de experiencia.
            </p>
          </div>
          
          <div class="p-6 bg-stone-100 rounded-lg">
            <div class="w-10 h-10 bg-stone-900 text-white rounded-full flex items-center justify-center font-serif text-lg mb-4">
              3
            </div>
            <h3 class="font-medium text-stone-900 mb-2">Atención al cliente</h3>
            <p class="text-sm text-stone-600">
              Si sos principiante, priorizá brokers con buena atención. 
              Vas a tener dudas y necesitás respuestas rápidas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
