import { For, createSignal, createMemo } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { 
  getTopByRendimiento, 
  getTopBySeguridad, 
  getTopByLiquidez,
  formatPorcentaje,
  formatMoneda,
} from '../data/inversiones';
import type { Inversion, Vista } from '../types';

function InversionCard(props: { inversion: Inversion; rank: number }) {
  const navigate = useNavigate();
  
  const colorRiesgo = () => {
    switch (props.inversion.riesgo) {
      case 'bajo': return 'text-emerald-700 bg-emerald-50';
      case 'medio': return 'text-amber-700 bg-amber-50';
      case 'alto': return 'text-rose-700 bg-rose-50';
    }
  };

  const colorCalificacion = () => {
    switch (props.inversion.calificacion) {
      case 'AAA': return 'text-emerald-700';
      case 'AA': return 'text-emerald-600';
      case 'A': return 'text-amber-600';
      default: return 'text-stone-600';
    }
  };

  const handleClick = (e: Event) => {
    e.preventDefault();
    navigate(`/inversion/${props.inversion.ticker}`);
  };

  return (
    <div
      onClick={handleClick}
      class="group block p-5 bg-white border border-stone-200 rounded-lg hover:border-stone-300 hover:shadow-sm transition-all cursor-pointer"
    >
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3 mb-2">
            <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs font-medium text-stone-500 bg-stone-100 rounded">
              {props.rank}
            </span>
            <h3 class="font-serif text-lg font-medium text-stone-900 truncate">
              {props.inversion.emisor}
            </h3>
          </div>
          
          <p class="text-sm text-stone-500 mb-3">
            {props.inversion.ticker} · {props.inversion.sector}
          </p>
          
          <div class="flex flex-wrap items-center gap-2">
            <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorRiesgo()}`}>
              {props.inversion.riesgo === 'bajo' ? 'Bajo riesgo' : 
               props.inversion.riesgo === 'medio' ? 'Riesgo medio' : 'Alto riesgo'}
            </span>
            <span class={`text-xs font-medium ${colorCalificacion()}`}>
              {props.inversion.calificacion}
            </span>
            <span class="text-xs text-stone-400">
              {props.inversion.plazo_meses} meses
            </span>
          </div>
        </div>
        
        <div class="text-right">
          <div class="font-serif text-2xl font-medium text-emerald-700">
            {formatPorcentaje(props.inversion.tasa_anual)}
          </div>
          <div class="text-xs text-stone-500">
            TNA
          </div>
          <div class="mt-2 text-sm text-stone-600">
            {formatMoneda(props.inversion.minimo_inversion, props.inversion.moneda)}
          </div>
          <div class="text-xs text-stone-400">
            mínimo
          </div>
        </div>
      </div>
    </div>
  );
}

function SeccionTop(props: { 
  titulo: string; 
  descripcion: string;
  inversiones: Inversion[];
  icono: string;
}) {
  return (
    <section class="py-12">
      <div class="mb-6">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-2xl">{props.icono}</span>
          <h2 class="font-serif text-2xl font-medium">{props.titulo}</h2>
        </div>
        <p class="text-stone-600">{props.descripcion}</p>
      </div>
      
      <div class="grid gap-4">
        <For each={props.inversiones}>
          {(inversion, index) => (
            <InversionCard 
              inversion={inversion} 
              rank={index() + 1}
            />
          )}
        </For>
      </div>
    </section>
  );
}

export default function Home() {
  const [vista, setVista] = createSignal<Vista>('rendimiento');
  
  const topRendimiento = createMemo(() => getTopByRendimiento(5));
  const topSeguridad = createMemo(() => getTopBySeguridad(5));
  const topLiquidez = createMemo(() => getTopByLiquidez(5));

  return (
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section class="text-center py-16 border-b border-stone-200">
        <h1 class="font-serif text-5xl sm:text-6xl font-medium text-stone-900 mb-6 tracking-tight">
          INVERSO
        </h1>
        <p class="text-xl text-stone-600 max-w-2xl mx-auto mb-8">
          Rendimientos claros. Sin comisión. Compará opciones de inversión en Argentina sin intermediarios.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <A
            href="/explorar"
            class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            Explorar inversiones
          </A>
          <A
            href="/aprender"
            class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
          >
            Aprender más
          </A>
        </div>
      </section>

      {/* Stats */}
      <section class="py-12 border-b border-stone-200">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="font-serif text-3xl font-medium text-stone-900">6</div>
            <div class="text-sm text-stone-500">Inversiones activas</div>
          </div>
          <div>
            <div class="font-serif text-3xl font-medium text-stone-900">8.0%</div>
            <div class="text-sm text-stone-500">Máximo rendimiento</div>
          </div>
          <div>
            <div class="font-serif text-3xl font-medium text-stone-900">AAA</div>
            <div class="text-sm text-stone-500">Mejor calificación</div>
          </div>
          <div>
            <div class="font-serif text-3xl font-medium text-stone-900">0</div>
            <div class="text-sm text-stone-500">Comisiones</div>
          </div>
        </div>
      </section>

      {/* Tops */}
      <SeccionTop
        titulo="Top Rendimiento"
        descripcion="Las inversiones con mayor tasa de retorno anual"
        inversiones={topRendimiento()}
        icono="📈"
      />

      <SeccionTop
        titulo="Top Seguridad"
        descripcion="Las inversiones con mejor calificación crediticia"
        inversiones={topSeguridad()}
        icono="🛡️"
      />

      <SeccionTop
        titulo="Top Liquidez"
        descripcion="Las inversiones más fáciles de comprar y vender"
        inversiones={topLiquidez()}
        icono="💧"
      />

      {/* CTA */}
      <section class="py-16 text-center border-t border-stone-200">
        <h2 class="font-serif text-3xl font-medium text-stone-900 mb-4">
          ¿Listo para invertir con claridad?
        </h2>
        <p class="text-stone-600 mb-8 max-w-xl mx-auto">
          Compará todas las opciones disponibles, filtrá por tus preferencias y encontrá la inversión que se adapte a vos.
        </p>
        <A
          href="/explorar"
          class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
        >
          Ver todas las inversiones
        </A>
      </section>
    </div>
  );
}
