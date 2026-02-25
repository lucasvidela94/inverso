# Deploy en Vercel - Instrucciones

## Paso 1: Preparar el proyecto

Asegurate de tener estos archivos en tu repo:
- ✅ `vercel.json` (ya creado)
- ✅ `.env.example` (variables documentadas)
- ✅ `package.json` con el script "build"

## Paso 2: Subir a GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/inverso.git
git push -u origin main
```

## Paso 3: Configurar en Vercel

1. Ir a https://vercel.com/new
2. Importar el repositorio de GitHub
3. Configurar el proyecto:

### Build Settings:
```
Framework Preset: Vite
Build Command: pnpm build
Output Directory: dist
```

### Environment Variables:
Ir a **Settings** > **Environment Variables** y agregar:

```
VITE_API_URL=https://inverso-api.lucasan-videla.workers.dev
```

## Paso 4: Deploy

Click en **Deploy** y esperar a que termine.

## Paso 5: Verificar

Una vez deployado, verificar que:
1. ✅ La URL de Vercel carga correctamente
2. ✅ Los datos de inversiones aparecen
3. ✅ La navegación funciona
4. ✅ Los filtros funcionan

## URLs importantes:

- **Frontend (Vercel):** https://inverso-tu-usuario.vercel.app
- **API (Cloudflare):** https://inverso-api.lucasan-videla.workers.dev
- **Repo GitHub:** https://github.com/tu-usuario/inverso

## Troubleshooting:

### Error 404 al recargar páginas:
El archivo `vercel.json` ya está configurado para manejar esto.

### Variables de entorno no funcionan:
Asegurate de que empiecen con `VITE_` para ser accesibles en el frontend.

### Build falla:
Verificar que `pnpm install` funcione localmente antes de deployar.

## Actualizaciones:

Para actualizar el deploy:
```bash
git add .
git commit -m "Update"
git push
```

Vercel hará deploy automático.
