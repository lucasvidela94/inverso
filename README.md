# INVERSO

Herramienta gratuita para comparar inversiones en Argentina. Rendimientos claros, sin comisión.

## Características

- **Explorar**: Todas las opciones de inversión con filtros avanzados
- **Brokers**: Comparativa multi-broker con comisiones y ratings
- **Aprender**: Guía educativa sobre inversiones
- **Calculadora**: Proyección de rendimientos
- **Zero cost**: Sin base de datos, sin backend, 100% frontend

## Tecnología

- **Framework**: SolidJS + Vite
- **Estilos**: TailwindCSS v3
- **Router**: @solidjs/router
- **Testing**: Vitest + Testing Library
- **Scraping**: Playwright
- **Deploy**: Vercel (static)

## Desarrollo

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm dev

# Build de producción
pnpm build

# Testing
pnpm test
pnpm test:coverage

# Scraping de datos
pnpm scrape
```

## Estructura

```
src/
  components/     # Componentes reutilizables
  pages/          # Páginas (Home, Explorar, Brokers, Aprender, Detalle)
  data/           # Datos y funciones
  types/          # TypeScript types
  test/           # Tests
  App.tsx         # Router principal
  index.tsx       # Entry point

scripts/
  scrape-bymadata.js  # Script de scraping de BYMADATA

.github/workflows/
  update-data.yml     # GitHub Actions para actualización diaria
```

## Datos

### Fuentes de datos

1. **Datos Mock** (actual): `src/data/inversiones.ts`
   - Datos de ejemplo para desarrollo
   
2. **Scraping de BYMADATA** (automático): `src/data/inversiones-scraped.json`
   - Actualizado diariamente vía GitHub Actions
   - Script: `scripts/scrape-bymadata.js`
   
3. **APIs de BYMA** (futuro):
   - EOD (End of Day): Precios al cierre
   - Índices: Datos en tiempo real
   - News: Hechos relevantes

### Actualización automática

Los datos se actualizan automáticamente cada día a las 9:00 AM (Argentina) mediante GitHub Actions. El workflow:

1. Ejecuta el scraper de BYMADATA
2. Si hay cambios, commitea y pushea los nuevos datos
3. Vercel redeploya automáticamente

Para ejecutar manualmente:
```bash
pnpm scrape
```

## Testing

```bash
# Ejecutar tests
pnpm test

# Modo UI
pnpm test:ui

# Con cobertura
pnpm test:coverage
```

## Deploy

### Vercel (recomendado)

1. Conecta tu repo de GitHub a Vercel
2. Configura el framework preset como "Vite"
3. El deploy es automático en cada push

### Manual

```bash
pnpm build
# Subir la carpeta `dist` a tu hosting
```

## Modelo de Negocio

- **Gratuito**: Sin costo para usuarios
- **Transparente**: Links de afiliado a múltiples brokers
- **Independiente**: Sin asociación exclusiva
- **Open Source**: Código disponible en GitHub

## Roadmap

- [x] MVP con datos mock
- [x] Comparativa de brokers
- [x] Testing básico
- [x] Script de scraping
- [x] GitHub Actions para actualización automática
- [ ] Integración con APIs gratuitas de BYMA
- [ ] Filtros avanzados
- [ ] Comparador lado a lado
- [ ] Alertas de nuevas oportunidades
- [ ] App mobile (PWA)

## Contribuir

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-feature`
3. Commitea tus cambios: `git commit -am 'Agrega nueva feature'`
4. Push a la rama: `git push origin feature/nueva-feature`
5. Crea un Pull Request

## Licencia

MIT

## Disclaimer

INVERSO es una herramienta educativa. La información proporcionada no constituye asesoramiento financiero. Las inversiones implican riesgos. Consultá con un asesor profesional antes de invertir.

---

**Hecho con ❤️ para democratizar el acceso a información de inversiones en Argentina**
# inverso
