import { For, createSignal, createMemo } from 'solid-js';
import { A } from '@solidjs/router';
import { getBrokers } from '../data/brokers';
import type { Broker } from '../data/brokers';

function StarRating(props: { rating: number }) {
  const fullStars = Math.floor(props.rating);
  const hasHalfStar = props.rating % 1 >= 0.5;
  
  return (
    <div class="flex items-center gap-1">
      <For each={Array(fullStars).fill(0)}>
        {() => (
          <svg class="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
      </For>
      {hasHalfStar && (
        <svg class="w-4 h-4 text-amber-500" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stop-color="currentColor" />
              <stop offset="50%" stop-color="#e7e5e4" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      <span class="ml-1 text-sm text-stone-600">{props.rating}</span>
    </div>
  );
}

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
            <div class="mt-1">
              <StarRating rating={props.broker.rating} />
            </div>
            <div class="mt-1 text-sm text-stone-500">
              {props.broker.opiniones.toLocaleString()} opiniones
            </div>
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
            <div class="font-medium text-stone-900">{props.broker.comisiones.mercado_nacional}</div>
          </div>
          
          <div class="p-3 bg-stone-50 rounded">
            <div class="text-xs text-stone-500 mb-1">Mercado Internacional</div>
            <div class="font-medium text-stone-900">{props.broker.comisiones.mercado_internacional}</div>
          </div>
          
          <div class="p-3 bg-stone-50 rounded">
            <div class="text-xs text-stone-500 mb-1">Cauciones</div>
            <div class="font-medium text-stone-900">{props.broker.comisiones.cauciones}</div>
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
  const [ordenarPor, setOrdenarPor] = createSignal('rating');
  
  const brokersOrdenados = createMemo(() => {
    const b = [...brokers()];
    switch (ordenarPor()) {
      case 'rating':
        return b.sort((a, b) => b.rating - a.rating);
      case 'comision':
        return b.sort((a, b) => {
          const aVal = parseFloat(a.comisiones.mercado_nacional);
          const bVal = parseFloat(b.comisiones.mercado_nacional);
          return aVal - bVal;
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
              <option value="rating">Mejor puntuación</option>
              <option value="comision">Menor comisión</option>
              <option value="nombre">Nombre</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p class="text-sm text-amber-800">
          Los links a brokers pueden ser de afiliados. Esto no aumenta el costo para vos 
          y nos ayuda a mantener INVERSO gratuito. Siempre mostramos todas las opciones 
          disponibles sin favoritismos.
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
