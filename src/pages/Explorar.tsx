import { For, createSignal, createMemo } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { inversionesMock, formatPorcentaje, formatMoneda, formatFecha } from '../data/inversiones';
import type { Inversion, Filtros } from '../types';

const filtrosDisponibles = {
  moneda: [
    { value: '', label: 'Todas' },
    { value: 'USD_MEP', label: 'Dólar MEP' },
    { value: 'USD', label: 'Dólar Cable' },
    { value: 'ARS', label: 'Pesos' },
  ],
  riesgo: [
    { value: '', label: 'Todos' },
    { value: 'bajo', label: 'Bajo' },
    { value: 'medio', label: 'Medio' },
    { value: 'alto', label: 'Alto' },
  ],
  plazo: [
    { value: '', label: 'Todos' },
    { value: 'corto', label: 'Corto (hasta 12 meses)' },
    { value: 'medio', label: 'Medio (12-36 meses)' },
    { value: 'largo', label: 'Largo (más de 36 meses)' },
  ],
  calificacion: [
    { value: '', label: 'Todas' },
    { value: 'AAA', label: 'AAA' },
    { value: 'AA', label: 'AA' },
    { value: 'A', label: 'A' },
    { value: 'BBB', label: 'BBB' },
  ],
};

function InversionRow(props: { inversion: Inversion }) {
  const navigate = useNavigate();
  
  const colorRiesgo = () => {
    switch (props.inversion.riesgo) {
      case 'bajo': return 'text-emerald-700 bg-emerald-50';
      case 'medio': return 'text-amber-700 bg-amber-50';
      case 'alto': return 'text-rose-700 bg-rose-50';
    }
  };

  const handleClick = (e: Event) => {
    e.preventDefault();
    navigate(`/inversion/${props.inversion.ticker}`);
  };

  return (
    <div
      onClick={handleClick}
      class="group flex items-center gap-4 p-4 bg-white border border-stone-200 rounded-lg hover:border-stone-300 hover:shadow-sm transition-all cursor-pointer"
    >
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <h3 class="font-medium text-stone-900 truncate">
            {props.inversion.emisor}
          </h3>
          <span class="text-xs text-stone-400">{props.inversion.ticker}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 text-sm">
          <span class="text-stone-500">{props.inversion.sector}</span>
          <span class="text-stone-300">·</span>
          <span class={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colorRiesgo()}`}>
            {props.inversion.calificacion}
          </span>
        </div>
      </div>

      <div class="hidden sm:flex flex-col items-end w-24">
        <span class="text-sm font-medium text-stone-900">
          {props.inversion.plazo_meses} meses
        </span>
        <span class="text-xs text-stone-500">plazo</span>
      </div>

      <div class="hidden sm:flex flex-col items-end w-28">
        <span class="text-sm font-medium text-stone-900">
          {formatMoneda(props.inversion.minimo_inversion, props.inversion.moneda)}
        </span>
        <span class="text-xs text-stone-500">mínimo</span>
      </div>

      <div class="flex flex-col items-end w-24">
        <span class="font-serif text-xl font-medium text-emerald-700">
          {formatPorcentaje(props.inversion.tasa_anual)}
        </span>
        <span class="text-xs text-stone-500">TNA</span>
      </div>
    </div>
  );
}

export default function Explorar() {
  const [filtros, setFiltros] = createSignal<Filtros>({});
  const [busqueda, setBusqueda] = createSignal('');

  const inversionesFiltradas = createMemo(() => {
    return inversionesMock.filter(inv => {
      if (!inv.esta_activa) return false;
      
      const f = filtros();
      
      if (f.moneda && inv.moneda !== f.moneda) return false;
      if (f.riesgo && inv.riesgo !== f.riesgo) return false;
      if (f.calificacion && inv.calificacion !== f.calificacion) return false;
      
      if (f.plazo) {
        if (f.plazo === 'corto' && inv.plazo_meses > 12) return false;
        if (f.plazo === 'medio' && (inv.plazo_meses <= 12 || inv.plazo_meses > 36)) return false;
        if (f.plazo === 'largo' && inv.plazo_meses <= 36) return false;
      }
      
      const b = busqueda().toLowerCase();
      if (b && !(
        inv.emisor.toLowerCase().includes(b) ||
        inv.ticker.toLowerCase().includes(b) ||
        inv.sector.toLowerCase().includes(b)
      )) return false;
      
      return true;
    }).sort((a, b) => b.tasa_anual - a.tasa_anual);
  });

  const updateFiltro = (key: keyof Filtros, value: string) => {
    setFiltros(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="mb-8">
        <h1 class="font-serif text-4xl font-medium text-stone-900 mb-2">
          Explorar
        </h1>
        <p class="text-stone-600">
          Todas las opciones de inversión disponibles
        </p>
      </div>

      {/* Busqueda */}
      <div class="mb-6">
        <input
          type="text"
          placeholder="Buscar por emisor, ticker o sector..."
          value={busqueda()}
          onInput={(e) => setBusqueda(e.currentTarget.value)}
          class="w-full px-4 py-3 text-base bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
        />
      </div>

      {/* Filtros */}
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-stone-100 rounded-lg">
        <div>
          <label class="block text-sm font-medium text-stone-700 mb-1">Moneda</label>
          <select
            value={filtros().moneda || ''}
            onChange={(e) => updateFiltro('moneda', e.currentTarget.value)}
            class="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            <For each={filtrosDisponibles.moneda}>
              {(opt) => <option value={opt.value}>{opt.label}</option>}
            </For>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-stone-700 mb-1">Riesgo</label>
          <select
            value={filtros().riesgo || ''}
            onChange={(e) => updateFiltro('riesgo', e.currentTarget.value)}
            class="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            <For each={filtrosDisponibles.riesgo}>
              {(opt) => <option value={opt.value}>{opt.label}</option>}
            </For>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-stone-700 mb-1">Plazo</label>
          <select
            value={filtros().plazo || ''}
            onChange={(e) => updateFiltro('plazo', e.currentTarget.value)}
            class="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            <For each={filtrosDisponibles.plazo}>
              {(opt) => <option value={opt.value}>{opt.label}</option>}
            </For>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-stone-700 mb-1">Calificación</label>
          <select
            value={filtros().calificacion || ''}
            onChange={(e) => updateFiltro('calificacion', e.currentTarget.value)}
            class="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            <For each={filtrosDisponibles.calificacion}>
              {(opt) => <option value={opt.value}>{opt.label}</option>}
            </For>
          </select>
        </div>
      </div>

      {/* Resultados */}
      <div class="mb-4 flex items-center justify-between">
        <span class="text-sm text-stone-600">
          {inversionesFiltradas().length} resultados
        </span>
        
        <button
          onClick={() => {
            setFiltros({});
            setBusqueda('');
          }}
          class="text-sm text-stone-500 hover:text-stone-900 transition-colors"
        >
          Limpiar filtros
        </button>
      </div>

      <div class="grid gap-3">
        <For each={inversionesFiltradas()}>
          {(inversion) => <InversionRow inversion={inversion} />}
        </For>
      </div>

      {inversionesFiltradas().length === 0 && (
        <div class="text-center py-16">
          <p class="text-stone-500">No se encontraron inversiones con esos filtros</p>
        </div>
      )}
    </div>
  );
}
