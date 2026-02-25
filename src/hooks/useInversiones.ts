import { createQuery, QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { getInversiones, getInversionByTicker, getTopRendimiento, getTopSeguridad, getIndices, getNews } from '../lib/api';

// Crear el cliente de query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 30, // 30 minutos
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Hook para obtener todas las inversiones
export function useInversiones() {
  return createQuery(() => ({
    queryKey: ['inversiones'],
    queryFn: async () => {
      const response = await getInversiones();
      return response.data;
    },
  }));
}

// Hook para obtener una inversión por ticker
export function useInversion(ticker: () => string) {
  return createQuery(() => ({
    queryKey: ['inversion', ticker()],
    queryFn: async () => {
      const response = await getInversionByTicker(ticker());
      return response.data;
    },
    enabled: !!ticker(),
  }));
}

// Hook para obtener top por rendimiento
export function useTopRendimiento(limit = 5) {
  return createQuery(() => ({
    queryKey: ['top', 'rendimiento', limit],
    queryFn: async () => {
      const response = await getTopRendimiento(limit);
      return response.data;
    },
  }));
}

// Hook para obtener top por seguridad
export function useTopSeguridad(limit = 5) {
  return createQuery(() => ({
    queryKey: ['top', 'seguridad', limit],
    queryFn: async () => {
      const response = await getTopSeguridad(limit);
      return response.data;
    },
  }));
}

// Hook para obtener índices
export function useIndices() {
  return createQuery(() => ({
    queryKey: ['indices'],
    queryFn: async () => {
      const response = await getIndices();
      return response.data;
    },
  }));
}

// Hook para obtener noticias
export function useNews(limit = 10) {
  return createQuery(() => ({
    queryKey: ['news', limit],
    queryFn: async () => {
      const response = await getNews(limit);
      return response.data;
    },
  }));
}

export { QueryClientProvider };
