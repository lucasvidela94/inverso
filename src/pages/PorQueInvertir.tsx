import { A } from '@solidjs/router';
import { createSignal, onMount } from 'solid-js';

export default function PorQueInvertir() {
  const [visibleSections, setVisibleSections] = createSignal<Set<string>>(new Set());

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  });

  const isVisible = (id: string) => visibleSections().has(id);

  return (
    <div class="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section class="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div class="absolute inset-0 opacity-[0.02]">
          <div class="absolute inset-0" style="background-image: repeating-linear-gradient(90deg, #292524 0px, #292524 1px, transparent 1px, transparent 100px);" />
        </div>
        
        {/* Decorative Elements */}
        <div class="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-emerald-700/10 to-transparent rounded-full blur-3xl" />
        <div class="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-stone-900/5 to-transparent rounded-full blur-3xl" />
        
        <div class="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-20">
          <div class="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Typography */}
            <div class="lg:col-span-7 space-y-8">
              <div class="inline-flex items-center gap-2 text-stone-500 text-sm tracking-widest uppercase font-medium">
                <span class="w-8 h-[1px] bg-stone-400" />
                Educación Financiera
              </div>
              
              <h1 class="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-stone-900 leading-[1.1] tracking-tight">
                Tu futuro
                <span class="block text-emerald-800">no se construye</span>
                <span class="block">solo con trabajo</span>
              </h1>
              
              <p class="text-xl md:text-2xl text-stone-600 leading-relaxed max-w-2xl font-light">
                La responsabilidad financiera no es opción. 
                Es la diferencia entre depender de sistemas externos o crear tu propia seguridad.
              </p>

              <div class="flex flex-wrap gap-4 pt-4">
                <A
                  href="/explorar"
                  class="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition-all duration-300 hover:shadow-xl hover:shadow-stone-900/20"
                >
                  Empezar a invertir
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </A>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div class="lg:col-span-5 relative">
              <div class="relative">
                {/* Quote Card */}
                <div class="bg-white p-8 shadow-2xl shadow-stone-900/10 relative z-10">
                  <svg class="w-12 h-12 text-emerald-700/20 mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p class="font-serif text-2xl text-stone-900 leading-relaxed mb-6">
                    El que no ahorra e invierte hoy, está robándole dinero a su yo del futuro.
                  </p>
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
                      <span class="text-stone-600 font-serif font-medium">A</span>
                    </div>
                    <div>
                      <div class="font-medium text-stone-900">Anónimo</div>
                      <div class="text-sm text-stone-500">Sabiduría popular</div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Frame */}
                <div class="absolute -top-4 -right-4 w-full h-full border-2 border-emerald-700/20 -z-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem - Jubilaciones */}
      <section 
        id="jubilaciones" 
        class={`animate-on-scroll py-24 lg:py-32 transition-all duration-1000 ${isVisible('jubilaciones') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div class="max-w-6xl mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-2 gap-16 items-start">
            <div class="space-y-8">
              <div class="inline-flex items-center gap-2 text-emerald-700 text-sm tracking-widest uppercase font-medium">
                <span class="w-8 h-[1px] bg-emerald-700" />
                La Realidad
              </div>
              
              <h2 class="font-serif text-4xl md:text-5xl font-medium text-stone-900 leading-tight">
                Los sistemas previsionales enfrentan desafíos estructurales
              </h2>

              <div class="prose prose-lg text-stone-700 space-y-6">
                <p class="text-xl leading-relaxed">
                  Los sistemas de jubilación basados en reparto (pay-as-you-go) funcionan mediante 
                  una transferencia directa: los trabajadores activos financian las pensiones de los 
                  jubilados actuales. Este modelo, adoptado por la mayoría de los países, enfrenta 
                  presiones demográficas crecientes.
                </p>

                <div class="bg-stone-100 p-6 border-l-4 border-emerald-700 my-8">
                  <p class="font-medium text-stone-900 mb-2">Factores que afectan la sostenibilidad:</p>
                  <ul class="space-y-2 text-stone-700">
                    <li>• Envejecimiento poblacional: menos trabajadores por jubilado</li>
                    <li>• Aumento de la expectativa de vida</li>
                    <li>• Presiones sobre los presupuestos fiscales</li>
                    <li>• Erosión del poder adquisitivo por inflación</li>
                  </ul>
                </div>

                <p>
                  Según datos del INDEC y organismos internacionales como el Banco Mundial, 
                  la relación entre haberes previsionales y salarios medios ha mostrado una 
                  tendencia decreciente en las últimas décadas, no solo en Argentina sino en 
                  múltiples economías desarrolladas y emergentes.
                </p>

                <p class="text-stone-600 italic">
                  Esto no es una crítica a políticas específicas: es una realidad demográfica 
                  y matemática que afecta a la mayoría de los sistemas de reparto en el mundo.
                </p>
              </div>
            </div>

            {/* Stats Visualization */}
            <div class="space-y-6">
              <div class="bg-white p-8 shadow-xl shadow-stone-900/5">
                <div class="text-6xl font-serif font-medium text-emerald-700 mb-2">~20%</div>
                <div class="text-stone-900 font-medium mb-2">Relación jubilación mínima/salario promedio</div>
                <div class="text-sm text-stone-500">Fuente: INDEC, datos históricos</div>
                <div class="mt-4 h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div class="h-full w-[20%] bg-emerald-700" />
                </div>
              </div>

              <div class="bg-white p-8 shadow-xl shadow-stone-900/5">
                <div class="text-6xl font-serif font-medium text-stone-900 mb-2">2-3:1</div>
                <div class="text-stone-900 font-medium mb-2">Relación trabajador/jubilado</div>
                <div class="text-sm text-stone-500">Tendencia decreciente desde los 90s</div>
                <div class="mt-4 h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div class="h-full w-[40%] bg-stone-900" />
                </div>
              </div>

              <div class="bg-stone-900 p-8 text-white">
                <div class="text-4xl font-serif font-medium text-emerald-400 mb-2">Global</div>
                <div class="font-medium mb-2">Un desafío mundial</div>
                <div class="text-sm text-stone-400">La OCDE proyecta que la ratio trabajador/jubilado seguirá cayendo en la mayoría de los países miembros.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution - Educación Financiera */}
      <section 
        id="educacion" 
        class={`animate-on-scroll py-24 lg:py-32 bg-stone-900 text-white transition-all duration-1000 ${isVisible('educacion') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div class="max-w-6xl mx-auto px-6 lg:px-12">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <div class="inline-flex items-center gap-2 text-emerald-400 text-sm tracking-widest uppercase font-medium mb-6">
              <span class="w-8 h-[1px] bg-emerald-400" />
              La Solución
              <span class="w-8 h-[1px] bg-emerald-400" />
            </div>
            
            <h2 class="font-serif text-4xl md:text-5xl font-medium leading-tight mb-6">
              La educación financiera es tu mejor inversión
            </h2>
            
            <p class="text-xl text-stone-400 leading-relaxed">
              No se trata de hacerse rico. Se trata de no depender exclusivamente de sistemas 
              que enfrentan presiones estructurales.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
                title: 'Entender el sistema',
                description: 'Saber cómo funcionan los mercados, la inflación, el riesgo y el tiempo. El conocimiento es la base de toda decisión financiera informada.'
              },
              {
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
                title: 'Definir objetivos',
                description: 'Invertís para metas concretas: tu jubilación, tu casa, la educación de tus hijos. El horizonte temporal determina tu estrategia.'
              },
              {
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                title: 'Proteger tu capital',
                description: 'La primera regla: preservar el capital. La segunda: no olvidar la primera. La seguridad precede al rendimiento.'
              }
            ].map((item, index) => (
              <div 
                key={index}
                class="bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 group"
              >
                <svg class="w-10 h-10 text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={item.icon} />
                </svg>
                <h3 class="font-serif text-xl font-medium mb-4 text-emerald-400">{item.title}</h3>
                <p class="text-stone-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What This Is NOT */}
      <section 
        id="claridad" 
        class={`animate-on-scroll py-24 lg:py-32 transition-all duration-1000 ${isVisible('claridad') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div class="max-w-6xl mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-2 gap-16">
            <div>
              <div class="inline-flex items-center gap-2 text-red-700 text-sm tracking-widest uppercase font-medium mb-6">
                <span class="w-8 h-[1px] bg-red-700" />
                Lo que NO es
              </div>
              
              <h2 class="font-serif text-4xl md:text-5xl font-medium text-stone-900 leading-tight mb-8">
                Esto no es trading. No es timba.
              </h2>

              <div class="space-y-6">
                <div class="flex gap-4 p-6 bg-red-50 border-l-4 border-red-400">
                  <svg class="w-6 h-6 text-red-700 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <h3 class="font-medium text-red-900 mb-1">No es hacerse rico rápido</h3>
                    <p class="text-red-700/80">Las promesas de ganancias extraordinarias en poco tiempo son estafas. El dinero fácil no existe.</p>
                  </div>
                </div>

                <div class="flex gap-4 p-6 bg-red-50 border-l-4 border-red-400">
                  <svg class="w-6 h-6 text-red-700 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <h3 class="font-medium text-red-900 mb-1">No es trading</h3>
                    <p class="text-red-700/80">Comprar y vender constantemente, apostar al alza o la baja. Eso es especulación, no inversión.</p>
                  </div>
                </div>

                <div class="flex gap-4 p-6 bg-red-50 border-l-4 border-red-400">
                  <svg class="w-6 h-6 text-red-700 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <h3 class="font-medium text-red-900 mb-1">No es seguir "tips"</h3>
                    <p class="text-red-700/80">Si alguien te dice "comprá esto que va a subir", corre. La información privilegiada es ilegal y los "gurús" suelen ser estafadores.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="inline-flex items-center gap-2 text-emerald-700 text-sm tracking-widest uppercase font-medium mb-6">
                <span class="w-8 h-[1px] bg-emerald-700" />
                Lo que SÍ es
              </div>
              
              <h2 class="font-serif text-4xl md:text-5xl font-medium text-stone-900 leading-tight mb-8">
                Es responsabilidad. Es disciplina.
              </h2>

              <div class="space-y-6">
                <div class="flex gap-4 p-6 bg-emerald-50 border-l-4 border-emerald-400">
                  <svg class="w-6 h-6 text-emerald-700 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 class="font-medium text-emerald-900 mb-1">Es pensar a largo plazo</h3>
                    <p class="text-emerald-700/80">Invertís hoy para tener un mañana mejor. No para mañana, sino para dentro de 10, 20, 30 años.</p>
                  </div>
                </div>

                <div class="flex gap-4 p-6 bg-emerald-50 border-l-4 border-emerald-400">
                  <svg class="w-6 h-6 text-emerald-700 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 class="font-medium text-emerald-900 mb-1">Es seguir el mercado</h3>
                    <p class="text-emerald-700/80">Entender que los rendimientos vienen de empresas reales que generan valor, no de especulación.</p>
                  </div>
                </div>

                <div class="flex gap-4 p-6 bg-emerald-50 border-l-4 border-emerald-400">
                  <svg class="w-6 h-6 text-emerald-700 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 class="font-medium text-emerald-900 mb-1">Es diversificar</h3>
                    <p class="text-emerald-700/80">No poner todos los huevos en la misma canasta. Distribuir el riesgo es proteger tu futuro.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Path Forward */}
      <section 
        id="camino" 
        class={`animate-on-scroll py-24 lg:py-32 bg-gradient-to-b from-stone-50 to-stone-100 transition-all duration-1000 ${isVisible('camino') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div class="max-w-6xl mx-auto px-6 lg:px-12">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <div class="inline-flex items-center gap-2 text-stone-500 text-sm tracking-widest uppercase font-medium mb-6">
              <span class="w-8 h-[1px] bg-stone-400" />
              El Camino
              <span class="w-8 h-[1px] bg-stone-400" />
            </div>
            
            <h2 class="font-serif text-4xl md:text-5xl font-medium text-stone-900 leading-tight mb-6">
              Cómo empezar tu viaje
            </h2>
          </div>

          <div class="space-y-8">
            {[
              {
                number: '01',
                title: 'Educate primero',
                description: 'Antes de poner un peso, entendé qué estás haciendo. Leé, aprendé, preguntá. El dinero que no entendés, lo perdés.'
              },
              {
                number: '02',
                title: 'Empezá pequeño',
                description: 'No necesitás miles de dólares. Empezá con lo que tengas. Lo importante es empezar y ser constante.'
              },
              {
                number: '03',
                title: 'Sé paciente',
                description: 'Las inversiones son maratones, no sprints. El tiempo es tu aliado más poderoso. Dejá que el interés compuesto haga su magia.'
              },
              {
                number: '04',
                title: 'Mantené la disciplina',
                description: 'Invertí todos los meses, sin importar si el mercado sube o baja. La constancia vence a la perfección.'
              }
            ].map((step, index) => (
              <div 
                key={index}
                class="flex gap-8 items-start p-8 bg-white shadow-lg shadow-stone-900/5 hover:shadow-xl hover:shadow-stone-900/10 transition-all duration-300 group"
              >
                <div class="text-5xl font-serif font-medium text-emerald-700/30 group-hover:text-emerald-700 transition-colors duration-300">
                  {step.number}
                </div>
                <div class="flex-1">
                  <h3 class="font-serif text-2xl font-medium text-stone-900 mb-3">{step.title}</h3>
                  <p class="text-lg text-stone-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section class="py-24 lg:py-32 bg-stone-900 text-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;" />
        </div>
        
        <div class="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-8">
            Tu futuro financiero
            <span class="block text-emerald-400">empieza hoy</span>
          </h2>
          
          <p class="text-xl text-stone-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            No esperes a que los sistemas externos resuelvan tu economía. Tomá el control 
            y construí el futuro que te merecés.
          </p>

          <div class="flex flex-wrap justify-center gap-4">
            <A
              href="/explorar"
              class="inline-flex items-center gap-2 px-10 py-5 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-600 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-700/30"
            >
              Ver opciones de inversión
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </A>
            
            <A
              href="/aprender"
              class="inline-flex items-center gap-2 px-10 py-5 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              Seguir aprendiendo
            </A>
          </div>
        </div>
      </section>
    </div>
  );
}