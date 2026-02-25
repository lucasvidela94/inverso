import { A } from '@solidjs/router';
import { JSX } from 'solid-js';
import ErrorBoundary from './ErrorBoundary';

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout(props: LayoutProps) {
  return (
    <div class="min-h-screen flex flex-col">
      <header class="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-sm border-b border-stone-200">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <A href="/" class="flex items-center gap-2">
              <span class="font-serif text-2xl font-medium tracking-tight">
                INVERSO
              </span>
            </A>
            
            <nav class="flex items-center gap-8">
              <A
                href="/"
                class="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                activeClass="text-stone-900"
                end
              >
                Inicio
              </A>
              <A
                href="/explorar"
                class="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                activeClass="text-stone-900"
              >
                Explorar
              </A>
              <A
                href="/brokers"
                class="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                activeClass="text-stone-900"
              >
                Brokers
              </A>
              <A
                href="/aprender"
                class="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                activeClass="text-stone-900"
              >
                Aprender
              </A>
              <A
                href="/por-que-invertir"
                class="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                activeClass="text-stone-900"
              >
                ¿Por qué invertir?
              </A>
            </nav>
          </div>
        </div>
      </header>

      <main class="flex-1">
        <ErrorBoundary>
          {props.children}
        </ErrorBoundary>
      </main>

      <footer class="border-t border-stone-200 py-8 mt-auto">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-sm text-stone-500">
              INVERSO - Información educativa, no es asesoramiento financiero
            </p>
            <div class="flex items-center gap-6">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-sm text-stone-500 hover:text-stone-900 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="#" 
                class="text-sm text-stone-500 hover:text-stone-900 transition-colors"
              >
                Donar
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
