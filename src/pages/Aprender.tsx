import { A } from '@solidjs/router';

export default function Aprender() {
  return (
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="mb-12">
        <h1 class="font-serif text-4xl font-medium text-stone-900 mb-4">
          Aprender
        </h1>
        <p class="text-xl text-stone-600">
          Todo lo que necesitás saber para empezar a invertir con claridad
        </p>
      </div>

      {/* Qué son las ON */}
      <section class="mb-16">
        <h2 class="font-serif text-2xl font-medium text-stone-900 mb-6">
          ¿Qué son las Obligaciones Negociables?
        </h2>
        
        <div class="prose prose-stone max-w-none">
          <p class="text-lg text-stone-700 mb-6">
            Las Obligaciones Negociables (ON) son instrumentos de renta fija emitidos por empresas. 
            En términos simples: le prestás plata a una empresa y ella te promete devolvértela con intereses.
          </p>

          <div class="bg-stone-100 p-6 rounded-lg mb-6">
            <h3 class="font-medium text-stone-900 mb-3">Analogía simple</h3>
            <p class="text-stone-700">
              Imaginate que un amigo confiable te pide $10.000 prestados. Te promete pagarte $400 cada 6 meses 
              como agradecimiento, y a los 3 años te devuelve los $10.000 originales. Las ON funcionan igual, 
              pero en vez de amigos son empresas grandes con calificaciones de riesgo (como las notas en el colegio: 
              AAA es 10, AA es 9).
            </p>
          </div>

          <h3 class="font-medium text-stone-900 mb-4">Características principales</h3>
          
          <ul class="space-y-3 text-stone-700">
            <li class="flex items-start gap-3">
              <span class="font-medium text-emerald-700">Renta fija:</span>
              <span>Sabés exactamente cuánto vas a ganar desde el primer día</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="font-medium text-emerald-700">Plazo definido:</span>
              <span>Tenés una fecha clara de cuándo recuperás tu inversión</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="font-medium text-emerald-700">Intereses periódicos:</span>
              <span>Cobrás renta cada mes, trimestre, semestre o año</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="font-medium text-emerald-700">Negociables:</span>
              <span>Podés venderlas antes del vencimiento si necesitás liquidez</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Calificaciones */}
      <section class="mb-16">
        <h2 class="font-serif text-2xl font-medium text-stone-900 mb-6">
          Calificaciones de riesgo
        </h2>
        
        <p class="text-stone-700 mb-6">
          Las calificadoras de riesgo evalúan la capacidad de las empresas para cumplir con sus pagos. 
          Es como una nota que indica qué tan confiable es el emisor.
        </p>

        <div class="grid gap-4">
          <div class="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <div class="font-serif text-2xl font-medium text-emerald-700 w-16">AAA</div>
            <div>
              <div class="font-medium text-emerald-900">Máxima calidad</div>
              <div class="text-sm text-emerald-700">Riesgo mínimo. Capacidad excepcional de pago.</div>
            </div>
          </div>

          <div class="flex items-center gap-4 p-4 bg-emerald-50/50 border border-emerald-200 rounded-lg">
            <div class="font-serif text-2xl font-medium text-emerald-600 w-16">AA</div>
            <div>
              <div class="font-medium text-emerald-900">Muy alta calidad</div>
              <div class="text-sm text-emerald-700">Riesgo muy bajo. Capacidad muy fuerte de pago.</div>
            </div>
          </div>

          <div class="flex items-center gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div class="font-serif text-2xl font-medium text-amber-700 w-16">A</div>
            <div>
              <div class="font-medium text-amber-900">Alta calidad</div>
              <div class="text-sm text-amber-700">Riesgo bajo. Capacidad fuerte de pago.</div>
            </div>
          </div>

          <div class="flex items-center gap-4 p-4 bg-stone-100 border border-stone-200 rounded-lg">
            <div class="font-serif text-2xl font-medium text-stone-600 w-16">BBB</div>
            <div>
              <div class="font-medium text-stone-900">Buena calidad</div>
              <div class="text-sm text-stone-600">Riesgo medio. Capacidad adecuada de pago.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparación */}
      <section class="mb-16">
        <h2 class="font-serif text-2xl font-medium text-stone-900 mb-6">
          ON vs Otras inversiones
        </h2>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-stone-200">
                <th class="pb-3 font-medium text-stone-900">Característica</th>
                <th class="pb-3 font-medium text-stone-900">ON</th>
                <th class="pb-3 font-medium text-stone-900">Plazo Fijo</th>
                <th class="pb-3 font-medium text-stone-900">Acciones</th>
              </tr>
            </thead>
            <tbody class="text-stone-700">
              <tr class="border-b border-stone-100">
                <td class="py-3">Rendimiento</td>
                <td class="py-3 text-emerald-700">Fijo y conocido</td>
                <td class="py-3">Fijo pero bajo</td>
                <td class="py-3">Variable</td>
              </tr>
              <tr class="border-b border-stone-100">
                <td class="py-3">Riesgo</td>
                <td class="py-3">Depende del emisor</td>
                <td class="py-3 text-emerald-700">Bajo (garantizado)</td>
                <td class="py-3">Alto</td>
              </tr>
              <tr class="border-b border-stone-100">
                <td class="py-3">Plazo</td>
                <td class="py-3">Medio/largo (1-5 años)</td>
                <td class="py-3 text-emerald-700">Corto (30-365 días)</td>
                <td class="py-3 text-emerald-700">Indefinido</td>
              </tr>
              <tr class="border-b border-stone-100">
                <td class="py-3">Liquidez</td>
                <td class="py-3">Media (mercado secundario)</td>
                <td class="py-3 text-emerald-700">Alta (rescatable)</td>
                <td class="py-3 text-emerald-700">Alta (venta inmediata)</td>
              </tr>
              <tr>
                <td class="py-3">Protección</td>
                <td class="py-3">Sin garantía explícita</td>
                <td class="py-3 text-emerald-700">Garantía del banco</td>
                <td class="py-3">Sin protección</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Cómo empezar */}
      <section class="mb-16">
        <h2 class="font-serif text-2xl font-medium text-stone-900 mb-6">
          ¿Cómo empezar?
        </h2>

        <div class="space-y-6">
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-stone-900 text-white rounded-full font-medium">
              1
            </div>
            <div>
              <h3 class="font-medium text-stone-900 mb-1">Abrí una cuenta en un broker</h3>
              <p class="text-stone-600">
                Necesitás una cuenta comitente en un Agente de Liquidación y Compensación (ALyC). 
                Algunos populares: Balanz, IOL, Bull Market, PPI.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-stone-900 text-white rounded-full font-medium">
              2
            </div>
            <div>
              <h3 class="font-medium text-stone-900 mb-1">Transferí fondos</h3>
              <p class="text-stone-600">
                Depositá pesos o dólares según la inversión que quieras hacer. 
                Para ON en dólar MEP, necesitás pesos que se convertirán.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-stone-900 text-white rounded-full font-medium">
              3
            </div>
            <div>
              <h3 class="font-medium text-stone-900 mb-1">Elegí tu inversión</h3>
              <p class="text-stone-600">
                Usá INVERSO para comparar opciones. Mirá el rendimiento, la calificación y el plazo. 
                Elegí la que se adapte a tu perfil.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-stone-900 text-white rounded-full font-medium">
              4
            </div>
            <div>
              <h3 class="font-medium text-stone-900 mb-1">Suscribí o comprá</h3>
              <p class="text-stone-600">
                En el mercado primario (suscripción) o secundario (compra a otro inversor). 
                Tu broker te guiará en el proceso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section class="text-center py-12 border-t border-stone-200">
        <h2 class="font-serif text-2xl font-medium text-stone-900 mb-4">
          ¿Listo para encontrar tu inversión?
        </h2>
        
        <A
          href="/explorar"
          class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
        >
          Explorar opciones
        </A>
      </section>
    </div>
  );
}
