import type { Inversion, Indice, NewsItem } from '../types';

// Usar variable de entorno o fallback a la URL de producción
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://inverso-api.lucasan-videla.workers.dev';

/**
 * Cliente HTTP para la API de INVERSO
 */
async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Obtiene todas las inversiones
 */
export async function getInversiones(): Promise<{ data: Inversion[]; meta: any }> {
  return fetchAPI('/api/inversiones');
}

/**
 * Obtiene una inversión por ticker
 */
export async function getInversionByTicker(ticker: string): Promise<{ data: Inversion; meta: any }> {
  return fetchAPI(`/api/inversiones/${ticker}`);
}

/**
 * Obtiene el top por rendimiento
 */
export async function getTopRendimiento(limit = 5): Promise<{ data: Inversion[]; meta: any }> {
  return fetchAPI(`/api/inversiones/top/rendimiento?limit=${limit}`);
}

/**
 * Obtiene el top por seguridad
 */
export async function getTopSeguridad(limit = 5): Promise<{ data: Inversion[]; meta: any }> {
  return fetchAPI(`/api/inversiones/top/seguridad?limit=${limit}`);
}

/**
 * Obtiene todos los índices
 */
export async function getIndices(): Promise<{ data: Indice[]; meta: any }> {
  return fetchAPI('/api/indices');
}

/**
 * Obtiene las noticias
 */
export async function getNews(limit = 10): Promise<{ data: NewsItem[]; meta: any }> {
  return fetchAPI(`/api/news?limit=${limit}`);
}
