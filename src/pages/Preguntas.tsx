import { A } from '@solidjs/router';
import { createSignal, For } from 'solid-js';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Por qué se creó INVERSO?",
    answer: "INVERSO nació de la frustración de no encontrar información clara y comparativa sobre inversiones en Argentina. Queremos democratizar el acceso a datos financieros, eliminando barreras técnicas y mostrando opciones reales de forma transparente."
  },
  {
    question: "¿Por qué es gratis?",
    answer: "Creemos que la información financiera básica debe ser accesible para todos. No cobramos porque nuestros costos son mínimos (100% frontend, sin base de datos propia) y porque no necesitamos monetizar a través de usuarios para mantener el proyecto."
  },
  {
    question: "¿Qué significa que sea open source?",
    answer: "Todo nuestro código está disponible públicamente en GitHub. Esto significa que cualquiera puede ver cómo funciona, sugerir mejoras, reportar bugs o incluso crear su propia versión. La transparencia es fundamental cuando hablamos de dinero. No hay registro de usuarios ni tracking."
  },
  {
    question: "¿Cómo puedo colaborar?",
    answer: "Hay muchas formas de ayudar: reportando errores, sugiriendo nuevas funcionalidades, mejorando el código, compartiendo el proyecto, o simplemente usando la herramienta y dándonos feedback."
  },
  {
    question: "¿De dónde vienen los datos?",
    answer: "Actualmente usamos scraping automatizado de BYMADATA (actualizado diariamente vía GitHub Actions) y datos mock para desarrollo. Estamos trabajando en integrar APIs oficiales de BYMA para datos en tiempo real."
  },
  {
    question: "¿Es segura la información?",
    answer: "Mostramos datos públicos del mercado argentino. No almacenamos información personal ni financiera de usuarios. Somos una herramienta de consulta, no una plataforma de inversión. No requerimos registro ni guardamos datos de ningún tipo."
  }
];

const upcomingFeatures = [
  {
    title: "Perfiles de riesgo",
    description: "Cuestionario para determinar tu perfil de inversor y recomendaciones personalizadas según tu tolerancia al riesgo. Sin almacenar datos personales.",
    status: "En diseño"
  },
  {
    title: "Comparador lado a lado",
    description: "Herramienta para comparar múltiples inversiones simultáneamente.",
    status: "En desarrollo"
  },
  {
    title: "App móvil (PWA)",
    description: "Versión instalable en tu teléfono para acceder rápidamente a la información.",
    status: "En roadmap"
  }
];

export default function Preguntas() {
  const [openIndex, setOpenIndex] = createSignal<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex() === index ? null : index);
  };

  return (
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div class="mb-8">
        <h1 class="font-serif text-4xl font-medium text-stone-900 mb-2">
          Preguntas Frecuentes
        </h1>
        <p class="text-stone-600">
          Todo lo que necesitás saber sobre INVERSO, nuestro modelo y cómo podés ser parte
        </p>
      </div>

      {/* FAQs */}
      <section class="py-12 border-b border-stone-200">
        <div class="mb-6">
          <h2 class="font-serif text-2xl font-medium">Sobre el proyecto</h2>
          <p class="text-stone-600 mt-2">Preguntas frecuentes sobre INVERSO</p>
        </div>
        
        <div class="space-y-4">
          <For each={faqs}>
            {(faq, index) => (
              <div class="border border-stone-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index())}
                  class="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-stone-50 transition-colors"
                >
                  <span class="font-medium text-stone-900 pr-4">{faq.question}</span>
                  <svg
                    class={`w-5 h-5 text-stone-500 flex-shrink-0 transition-transform ${openIndex() === index() ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openIndex() === index() && (
                  <div class="px-6 pb-6">
                    <p class="text-stone-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            )}
          </For>
        </div>
      </section>

      {/* Upcoming Features */}
      <section class="py-12 border-b border-stone-200">
        <div class="mb-6">
          <h2 class="font-serif text-2xl font-medium">Próximas funcionalidades</h2>
          <p class="text-stone-600 mt-2">Lo que viene para INVERSO</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <For each={upcomingFeatures}>
            {(feature) => (
              <div class="bg-stone-50 border border-stone-200 rounded-lg p-6">
                <div class="flex items-start justify-between mb-3">
                  <h3 class="font-medium text-stone-900">{feature.title}</h3>
                  <span class={`text-xs px-2 py-1 rounded-full ${
                    feature.status === 'En desarrollo' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : feature.status === 'En diseño'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-stone-200 text-stone-600'
                  }`}>
                    {feature.status}
                  </span>
                </div>
                <p class="text-sm text-stone-600">{feature.description}</p>
              </div>
            )}
          </For>
        </div>
      </section>

      {/* How to Contribute */}
      <section class="py-12 border-b border-stone-200">
        <div class="mb-6">
          <h2 class="font-serif text-2xl font-medium">¿Cómo colaborar?</h2>
          <p class="text-stone-600 mt-2">Formas de contribuir al proyecto</p>
        </div>
        
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="text-center p-6">
            <div class="w-12 h-12 bg-stone-900 text-white rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="font-medium text-stone-900 mb-2">Reportar errores</h3>
            <p class="text-sm text-stone-600">
              Encontraste un bug o dato incorrecto? Creá un issue en GitHub.
            </p>
          </div>

          <div class="text-center p-6">
            <div class="w-12 h-12 bg-stone-900 text-white rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="font-medium text-stone-900 mb-2">Sugerir ideas</h3>
            <p class="text-sm text-stone-600">
              Tenés una funcionalidad en mente? Compartila en GitHub Discussions.
            </p>
          </div>

          <div class="text-center p-6">
            <div class="w-12 h-12 bg-stone-900 text-white rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 class="font-medium text-stone-900 mb-2">Contribuir código</h3>
            <p class="text-sm text-stone-600">
              Sabés programar? Mandá un Pull Request con mejoras.
            </p>
          </div>

          <div class="text-center p-6">
            <div class="w-12 h-12 bg-stone-900 text-white rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <h3 class="font-medium text-stone-900 mb-2">Compartir</h3>
            <p class="text-sm text-stone-600">
              Difundí INVERSO con amigos y familia interesados en invertir.
            </p>
          </div>

          <div class="text-center p-6">
            <div class="w-12 h-12 bg-stone-900 text-white rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3 class="font-medium text-stone-900 mb-2">Dar feedback</h3>
            <p class="text-sm text-stone-600">
              Usá la herramienta y contanos qué te gusta y qué no.
            </p>
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section class="py-12">
        <div class="bg-stone-900 text-white rounded-lg p-8">
          <div class="text-center">
            <h2 class="font-serif text-3xl font-medium mb-4">
              Open Source
            </h2>
            <p class="text-stone-300 text-lg mb-8">
              INVERSO es 100% código abierto. Podés ver, usar y modificar todo el código. 
              La transparencia es fundamental cuando hablamos de inversiones.
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/lucasvidela94/inverso"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 bg-white text-stone-900 rounded-lg font-medium hover:bg-stone-100 transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Ver Frontend
              </a>
              
              <a
                href="https://github.com/lucasvidela94/inverso-api"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 bg-stone-800 text-white rounded-lg font-medium hover:bg-stone-700 transition-colors border border-stone-700"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Ver API
              </a>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
