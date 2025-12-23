# Estrés Hídrico Chile (MVP educativo)

Panel bilingüe (ES/EN) para explorar indicadores de estrés hídrico en Chile con
mapa, filtros y contenidos pedagógicos.

## Estructura del monorepo

```
/apps
  /web      # React + Vite + TS
  /api      # FastAPI
/packages
  /shared   # Tipos TS compartidos
/data
  /processed  # Datos listos para la app (mock)
  /raw        # Descargas sin procesar
/scripts      # Fetch y build de datos
/docs         # Notas de pedagogía, arquitectura y fuentes
```

## Requisitos
- Node 18+
- pnpm 8+
- Python 3.11+

## Instalación

```bash
pnpm install
pip install -r apps/api/requirements.txt
```

## Desarrollo

- Levantar frontend y API juntos:

```bash
pnpm dev
```

- Solo frontend:

```bash
cd apps/web
pnpm dev
```

- Solo API:

```bash
cd apps/api
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Scripts clave

- Lint web: `pnpm lint`
- Tests: `pnpm test` (vitest + pytest)
- Build web: `pnpm build`

## Datos mock

- `data/processed/regions.geojson`: 3 polígonos ficticios. Reemplázalo por
  geometrías oficiales.
- `data/processed/index_values.json`: valores de ejemplo 2018–2020 para los
  índices WATER_STRESS y DROUGHT_RISK.

### Pipeline de datos

1. (Opcional) Descarga con `SOURCE_URL`: `python scripts/fetch_sources.py`.
2. Inspecciona/convierte en `scripts/build_processed.py` y exporta a
   `data/processed`.

## Despliegue

- **Frontend (Netlify):** configurado en `netlify.toml` con build `pnpm -C
  apps/web build` y publish `apps/web/dist`. Define `VITE_API_URL` apuntando a
  la API.
- **Backend (Render):** crear servicio web con `uvicorn app.main:app`. Usa la
  variable `WEB_ORIGIN` para CORS.

## Endpoints API

- `GET /health`
- `GET /meta`
- `GET /data?region=&cuenca=&year=&index=`
- `GET /tiles-or-geojson`

## Notas pedagógicas

Consulta `docs/pedagogy.md` para el enfoque educativo y `docs/architecture.md`
para el resumen técnico.
