import { JSX, ErrorBoundary as SolidErrorBoundary } from 'solid-js';

interface Props {
  children: JSX.Element;
}

export default function ErrorBoundary(props: Props) {
  return (
    <SolidErrorBoundary
      fallback={(err, reset) => (
        <div class="min-h-screen flex items-center justify-center px-4">
          <div class="max-w-md w-full text-center">
            <div class="mb-6">
              <svg 
                class="w-16 h-16 mx-auto text-rose-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
            
            <h1 class="font-serif text-2xl font-medium text-stone-900 mb-2">
              Algo salió mal
            </h1>
            
            <p class="text-stone-600 mb-6">
              {err instanceof Error ? err.message : 'Error desconocido'}
            </p>
            
            <button
              onClick={reset}
              class="inline-flex items-center px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      )}
    >
      {props.children}
    </SolidErrorBoundary>
  );
}
