import os
from typing import Optional

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from .data_loader import get_data, get_meta, load_regions_geojson
from .models import DataResponse, MetaResponse

app = FastAPI(
    title="Estrés Hídrico Chile API",
    description="API educativa con datos de ejemplo para el panel de estrés hídrico en Chile.",
    version="0.1.0",
    openapi_tags=[
        {"name": "health", "description": "Estado de la API"},
        {"name": "metadata", "description": "Listados de años, índices y dominios geográficos"},
        {"name": "dataset", "description": "Datos filtrados para mapa, gráficos y resúmenes"},
    ],
)

origins_env = os.getenv("WEB_ORIGIN")
allowed_origins = [origin.strip() for origin in origins_env.split(",") if origin.strip()] if origins_env else ["*"]
allow_credentials = bool(origins_env)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["health"])
def health() -> dict:
    return {"status": "ok"}


@app.get("/meta", response_model=MetaResponse, tags=["metadata"], summary="Metadatos disponibles")
def meta() -> MetaResponse:
    """Devuelve listas de años, índices, regiones y cuencas disponibles en el dataset."""
    return get_meta()


@app.get(
    "/data",
    response_model=DataResponse,
    tags=["dataset"],
    summary="Datos filtrados para mapa y gráficos",
)
def data(
    region: Optional[str] = Query(None, description="Nombre de la región"),
    basin: Optional[str] = Query(None, description="Nombre de la cuenca"),
    year: Optional[int] = Query(None, description="Año a consultar"),
    index: Optional[str] = Query(None, description="Índice seleccionado"),
) -> DataResponse:
    """Entrega datos agregados para el mapa (mapValues), series temporales y un resumen."""
    return get_data(region=region, basin=basin, year=year, index=index)


@app.get(
    "/tiles-or-geojson",
    tags=["metadata"],
    summary="GeoJSON de regiones de ejemplo",
)
def geojson() -> dict:
    return load_regions_geojson()
