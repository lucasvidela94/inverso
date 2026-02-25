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
    <div class="min-h-screen bg-[#fafaf9]">
      {/* Hero Section - Editorial Impact */}
      <section class="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div class="absolute inset-0 opacity-[0.03]">
          <div class="absolute inset-0" style="background-image: repeating-linear-gradient(90deg, #1e3a5f 0px, #1e3a5f 1px, transparent 1px, transparent 100px);" />
        </div>
        
        {/* Decorative Elements */}
        <div class="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-[#c9a227]/20 to-transparent rounded-full blur-3xl" />
        <div class="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-[#1e3a5f]/10 to-transparent rounded-full blur-3xl" />
        
        <div class="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-20">
          <div class="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Typography */}
            <div class="lg:col-span-7 space-y-8">
              <div class="inline-flex items-center gap-2 text-[#1e3a5f]/60 text-sm tracking-widest uppercase font-medium">
                <span class="w-8 h-[1px] bg-[#1e3a5f]/40" />
                Educación Financiera
              </div>
              
              <h1 class="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-[#1e3a5f] leading-[1.1] tracking-tight">
                Tu futuro
                <span class="block text-[#c9a227]">no se construye</span>
                <span class="block">solo con trabajo</span>
              </h1>
              
              <p class="text-xl md:text-2xl text-[#1e3a5f]/70 leading-relaxed max-w-2xl font-light">
                En Argentina, la responsabilidad financiera no es opción. 
                Es la diferencia entre depender del sistema o crear tu propia seguridad.
              </p>

              <div class="flex flex-wrap gap-4 pt-4">
                <A
                  href="/explorar"
                  class="inline-flex items-center gap-2 px-8 py-4 bg-[#1e3a5f] text-white font-medium rounded-sm hover:bg-[#152a45] transition-all duration-300 hover:shadow-xl hover:shadow-[#1e3a5f]/20"
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
                <div class="bg-white p-8 shadow-2xl shadow-[#1e3a5f]/10 relative z-10">
                  <svg class="w-12 h-12 text-[#c9a227]/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p class="font-serif text-2xl text-[#1e3a5f] leading-relaxed mb-6">
                    El que no ahorra e invierte hoy, está robándole dinero a su yo del futuro.
                  </p>
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-[#1e3a5f]/10 rounded-full flex items-center justify-center">
                      <span class="text-[#1e3a5f] font-serif font-medium">A</span>
                    </div>
                    <div>
                      <div class="font-medium text-[#1e3a5f]">Anónimo</div>
                      <div class="text-sm text-[#1e3a5f]/50">Sabiduría popular</div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Frame */}
                <div class="absolute -top-4 -right-4 w-full h-full border-2 border-[#c9a227]/30 -z-0" />
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
              <div class="inline-flex items-center gap-2 text-[#c9a227] text-sm tracking-widest uppercase font-medium">
                <span class="w-8 h-[1px] bg-[#c9a227]" />
                La Realidad
              </div>
              
              <h2 class="font-serif text-4xl md:text-5xl font-medium text-[#1e3a5f] leading-tight">
                El sistema de jubilaciones está roto
              </h2>

              <div class="prose prose-lg text-[#1e3a5f]/80 space-y-6">
                <p class="text-xl leading-relaxed">
                  En Argentina, el sistema previsional funciona como una pirámide: los trabajadores activos 
                  financian las jubilaciones de los actuales jubilados. El problema es que la pirámide se 
                  está invirtiendo.
                </p>

                <div class="bg-[#1e3a5f]/5 p-6 border-l-4 border-[#c9a227] my-8">
                  <p class="font-medium text-[#1e3a5f] mb-2">La matemática es implacable:</p>
                  <ul class="space-y-2 text-[#1e3a5f]/70">
                    <li>• Cada vez hay menos trabajadores por jubilado</li>
                    <li>• La inflación erosiona el valor de los haberes</li>
                    <li>• El déficit fiscal es constante</li>
                    <li>• Las jubilaciones mínimas no cubren la canasta básica</li>
                  </ul>
                </div>

                <p>
                  Hoy, una jubilación mínima representa menos del 20% del salario promedio. 
                  No es un error del sistema: es una característica de un modelo insostenible.
                </p>
              </div>
            </div>

            {/* Stats Visualization */}
            <div class="space-y-6">
              <div class="bg-white p-8 shadow-xl shadow-[#1e3a5f]/5">
                <div class="text-6xl font-serif font-medium text-[#c9a227] mb-2">20%</div>
                <div class="text-[#1e3a5f] font-medium mb-2">Relación jubilación/salario</div>
                <div class="text-sm text-[#1e3a5f]/60">Un jubilado gana 1/5 de un trabajador activo</div>
                <div class="mt-4 h-2 bg-[#1e3a5f]/10 rounded-full overflow-hidden">
                  <div class="h-full w-[20%] bg-[#c9a227]" />
                </div>
              </div>

              <div class="bg-white p-8 shadow-xl shadow-[#1e3a5f]/5">
                <div class="text-6xl font-serif font-medium text-[#1e3a5f] mb-2">2:1</div>
                <div class="text-[#1e3a5f] font-medium mb-2">Relación trabajador/jubilado</div>
                <div class="text-sm text-[#1e3a5f]/60">Cada jubilado es financiado por solo 2 trabajadores</div>
                <div class="mt-4 h-2 bg-[#1e3a5f]/10 rounded-full overflow-hidden">
                  <div class="h-full w-[50%] bg-[#1e3a5f]" />
                </div>
              </div>

              <div class="bg-[#1e3a5f] p-8 text-white">
                <div class="text-4xl font-serif font-medium text-[#c9a227] mb-2">100%+</div>
                <div class="font-medium mb-2">Inflación anual</div>
                <div class="text-sm text-white/70">El poder adquisitivo se reduce a la mitad cada año</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution - Educación Financiera */}
      <section 
        id="educacion" 
        class={`animate-on-scroll py-24 lg:py-32 bg-[#1e3a5f] text-white transition-all duration-1000 ${isVisible('educacion') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div class="max-w-6xl mx-auto px-6 lg:px-12">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <div class="inline-flex items-center gap-2 text-[#c9a227] text-sm tracking-widest uppercase font-medium mb-6">
              <span class="w-8 h-[1px] bg-[#c9a227]" />
              La Solución
              <span class="w-8 h-[1px] bg-[#c9a227]" />
            </div>
            
            <h2 class="font-serif text-4xl md:text-5xl font-medium leading-tight mb-6">
              La educación financiera es tu única salida
            </h2>
            
            <p class="text-xl text-white/70 leading-relaxed">
              No se trata de hacerse rico. Se trata de no depender de un sistema que ya falló.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📚',
                title: 'Entender el sistema',
                description: 'Saber cómo funcionan los mercados, la inflación, el riesgo y el tiempo. El conocimiento es tu mejor inversión.'
              },
              {
                icon: '🎯',
                title: 'Definir objetivos',
                description: 'No invertís para hacerte rico de la noche a la mañana. Invertís para tu jubilación, tu casa, la educación de tus hijos.'
              },
              {
                icon: '🛡️',
                title: 'Proteger tu capital',
                description: 'La primera regla: no perder dinero. La segunda: no olvidar la primera. Preservar es más importante que ganar.'
              }
            ].map((item, index) => (
              <div 
                key={index}
                class="bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 group"
              >
                <div class="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 class="font-serif text-xl font-medium mb-4 text-[#c9a227]">{item.title}</h3>
                <p class="text-white/70 leading-relaxed">{item.description}</p>
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
              <div class="inline-flex items-center gap-2 text-red-600 text-sm tracking-widest uppercase font-medium mb-6">
                <span class="w-8 h-[1px] bg-red-600" />
                Lo que NO es
              </div>
              
              <h2 class="font-serif text-4xl md:text-5xl font-medium text-[#1e3a5f] leading-tight mb-8">
                Esto no es trading. No es timba.
              </h2>

              <div class="space-y-6">
                <div class="flex gap-4 p-6 bg-red-50 border-l-4 border-red-400">
                  <div class="text-2xl">🚫</div>
                  <div>
                    <h3 class="font-medium text-red-900 mb-1">No es hacerse rico rápido</h3>
                    <p class="text-red-700/80">Las promesas de ganancias extraordinarias en poco tiempo son estafas. El dinero fácil no existe.</p>
                  </div>
                </div>

                <div class="flex gap-4 p-6 bg-red-50 border-l-4 border-red-400">
                  <div class="text-2xl">🚫</div>
                  <div>
                    <h3 class="font-medium text-red-900 mb-1">No es trading</h3>
                    <p class="text-red-700/80">Comprar y vender constantemente, apostar al alza o la baja. Eso es especulación, no inversión.</p>
                  </div>
                </div>

                <div class="flex gap-4 p-6 bg-red-50 border-l-4 border-red-400">
                  <div class="text-2xl">🚫</div>
                  <div>
                    <h3 class="font-medium text-red-900 mb-1">No es seguir "tips"</h3>
                    <p class="text-red-700/80">Si alguien te dice "comprá esto que va a subir", corre. La información privilegiada es ilegal y los "gurús" suelen ser estafadores.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="inline-flex items-center gap-2 text-emerald-600 text-sm tracking-widest uppercase font-medium mb-6">
                <span class="w-8 h-[1px] bg-emerald-600" />
                Lo que SÍ es
              </div>
              
              <h2 class="font-serif text-4xl md:text-5xl font-medium text-[#1e3a5f] leading-tight mb-8">
                Es responsabilidad. Es disciplina.
              </h2>

              <div class="space-y-6">
                <div class="flex gap-4 p-6 bg-emerald-50 border-l-4 border-emerald-400">
                  <div class="text-2xl">✅</div>
                  <div>
                    <h3 class="font-medium text-emerald-900 mb-1">Es pensar a largo plazo</h3>
                    <p class="text-emerald-700/80">Invertís hoy para tener un mañana mejor. No para mañana, sino para dentro de 10, 20, 30 años.</p>
                  </div>
                </div>

                <div class="flex gap-4 p-6 bg-emerald-50 border-l-4 border-emerald-400">
                  <div class="text-2xl">✅</div>
                  <div>
                    <h3 class="font-medium text-emerald-900 mb-1">Es seguir el mercado</h3>
                    <p class="text-emerald-700/80">Entender que los rendimientos vienen de empresas reales que generan valor, no de especulación.</p>
                  </div>
                </div>

                <div class="flex gap-4 p-6 bg-emerald-50 border-l-4 border-emerald-400">
                  <div class="text-2xl">✅</div>
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
        class={`animate-on-scroll py-24 lg:py-32 bg-gradient-to-b from-[#fafaf9] to-[#f0f0ec] transition-all duration-1000 ${isVisible('camino') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div class="max-w-6xl mx-auto px-6 lg:px-12">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <div class="inline-flex items-center gap-2 text-[#1e3a5f]/60 text-sm tracking-widest uppercase font-medium mb-6">
              <span class="w-8 h-[1px] bg-[#1e3a5f]/40" />
              El Camino
              <span class="w-8 h-[1px] bg-[#1e3a5f]/40" />
            </div>
            
            <h2 class="font-serif text-4xl md:text-5xl font-medium text-[#1e3a5f] leading-tight mb-6">
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
                class="flex gap-8 items-start p-8 bg-white shadow-lg shadow-[#1e3a5f]/5 hover:shadow-xl hover:shadow-[#1e3a5f]/10 transition-all duration-300 group"
              >
                <div class="text-5xl font-serif font-medium text-[#c9a227]/30 group-hover:text-[#c9a227] transition-colors duration-300">
                  {step.number}
                </div>
                <div class="flex-1">
                  <h3 class="font-serif text-2xl font-medium text-[#1e3a5f] mb-3">{step.title}</h3>
                  <p class="text-lg text-[#1e3a5f]/70 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section class="py-24 lg:py-32 bg-[#1e3a5f] text-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;" />
        </div>
        
        <div class="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-8">
            Tu futuro financiero
            <span class="block text-[#c9a227]">empieza hoy</span>
          </h2>
          
          <p class="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            No esperes a que el sistema te salve. Tomá el control de tu economía y construí 
            el futuro que te merecés.
          </p>

          <div class="flex flex-wrap justify-center gap-4">
            <A
              href="/explorar"
              class="inline-flex items-center gap-2 px-10 py-5 bg-[#c9a227] text-[#1e3a5f] font-medium rounded-sm hover:bg-[#d4b43a] transition-all duration-300 hover:shadow-xl hover:shadow-[#c9a227]/30"
            >
              Ver opciones de inversión
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </A>
            
            <A
              href="/aprender"
              class="inline-flex items-center gap-2 px-10 py-5 border-2 border-white/30 text-white font-medium rounded-sm hover:bg-white/10 transition-all duration-300"
            >
              Seguir aprendiendo
            </A>
          </div>
        </div>
      </section>
    </div>
  );
}