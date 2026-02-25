import { A } from '@solidjs/router';
import { JSX, createSignal } from 'solid-js';
import ErrorBoundary from './ErrorBoundary';

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout(props: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  const navLinks = [
    { href: '/', label: 'Inicio', end: true },
    { href: '/explorar', label: 'Explorar' },
    { href: '/brokers', label: 'Brokers' },
    { href: '/aprender', label: 'Aprender' },
    { href: '/por-que-invertir', label: '¿Por qué invertir?' },
  ];

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
            
            {/* Desktop Navigation */}
            <nav class="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <A
                  href={link.href}
                  class="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                  activeClass="text-stone-900"
                  end={link.end}
                >
                  {link.label}
                </A>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen())}
              class="md:hidden p-2 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Toggle menu"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen() ? (
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen() && (
            <nav class="md:hidden py-4 border-t border-stone-200">
              <div class="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <A
                    href={link.href}
                    class="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors py-2"
                    activeClass="text-stone-900"
                    end={link.end}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </A>
                ))}
              </div>
            </nav>
          )}
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
                href="https://cafecito.app/inverso" 
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-stone-500 hover:text-stone-900 transition-colors"
              >
                Cafecito
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}