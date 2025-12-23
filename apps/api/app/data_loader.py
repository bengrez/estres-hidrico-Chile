import json
from functools import lru_cache
from pathlib import Path
from statistics import mean
from typing import Dict, List, Optional

from .models import DataResponse, MapValue, MetaResponse, SeriesPoint, SummaryStats, SummaryText

BASE_DIR = Path(__file__).resolve().parents[3]
DATA_DIR = BASE_DIR / "data" / "processed"


def _load_json(path: Path):
    with path.open(encoding="utf-8") as f:
        return json.load(f)


@lru_cache()
def load_index_dataset() -> Dict:
    dataset_path = DATA_DIR / "index_values.json"
    return _load_json(dataset_path)


@lru_cache()
def load_regions_geojson() -> Dict:
    geo_path = DATA_DIR / "regions.geojson"
    return _load_json(geo_path)


def get_meta() -> MetaResponse:
    data = load_index_dataset()
    return MetaResponse(
        years=data.get("years", []),
        indices=data.get("indices", []),
        regions=data.get("regions", []),
        basins=data.get("basins", []),
    )


def _filter_values(region: Optional[str], basin: Optional[str], year: Optional[int], index: Optional[str]):
    dataset = load_index_dataset()
    values: List[Dict] = dataset.get("values", [])

    filtered = [
        item
        for item in values
        if (not region or item.get("region") == region)
        and (not basin or item.get("basin") == basin)
        and (year is None or item.get("year") == year)
        and (not index or item.get("index") == index)
    ]
    return filtered


def _aggregate_map(values: List[Dict]) -> List[MapValue]:
    grouped: Dict[str, List[float]] = {}
    for item in values:
        key = item.get("region") or item.get("basin")
        if not key:
            continue
        grouped.setdefault(key, []).append(item["value"])

    return [
        MapValue(region=key if key.startswith("Región") else None, basin=None if key.startswith("Región") else key, value=mean(vals))
        for key, vals in grouped.items()
    ]


def _aggregate_series(values: List[Dict], selected_index: Optional[str]) -> List[SeriesPoint]:
    by_year: Dict[int, List[float]] = {}
    for item in values:
        if selected_index and item.get("index") != selected_index:
            continue
        by_year.setdefault(item["year"], []).append(item["value"])
    return [SeriesPoint(year=year, value=mean(vals), index=selected_index or values[0]["index"]) for year, vals in sorted(by_year.items())]


def _build_summary(values: List[Dict], selected_index: Optional[str]) -> SummaryStats:
    numeric_values = [item["value"] for item in values]
    if not numeric_values:
        return SummaryStats(min=None, max=None, avg=None, count=0, text=SummaryText(es="Sin datos", en="No data"))

    min_v = min(numeric_values)
    max_v = max(numeric_values)
    avg_v = round(mean(numeric_values), 2)
    label = selected_index or values[0]["index"]

    es_text = f"El promedio del índice {label} es {avg_v}. Valores de {min_v} a {max_v}."
    en_text = f"The average for {label} is {avg_v}. Values range from {min_v} to {max_v}."

    return SummaryStats(
        min=round(min_v, 2),
        max=round(max_v, 2),
        avg=avg_v,
        count=len(numeric_values),
        text=SummaryText(es=es_text, en=en_text),
    )


def get_data(region: Optional[str], basin: Optional[str], year: Optional[int], index: Optional[str]) -> DataResponse:
    filtered = _filter_values(region, basin, year, index)
    dataset = load_index_dataset()

    if not filtered:
        # fall back to dataset with matching index if possible for context
        fallback_index = index or dataset.get("indices", [None])[0]
        filtered = _filter_values(region, basin, year, fallback_index)

    map_values = _aggregate_map(filtered)
    series = _aggregate_series(filtered, index or (filtered[0]["index"] if filtered else None)) if filtered else []
    summary = _build_summary(filtered, index)

    return DataResponse(mapValues=map_values, series=series, summary=summary)
