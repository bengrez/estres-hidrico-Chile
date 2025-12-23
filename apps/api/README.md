# API (FastAPI)

Endpoints:
- `GET /health`
- `GET /meta`
- `GET /data`
- `GET /tiles-or-geojson`

## Ejecutar local

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Despliegue en Render

1. Crear servicio Web en Render apuntando a este directorio.
2. Comando de inicio: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. Variable `WEB_ORIGIN` con la URL de Netlify para CORS.
