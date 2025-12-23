from typing import List, Optional
from pydantic import BaseModel


class MetaResponse(BaseModel):
    years: List[int]
    indices: List[str]
    regions: List[str]
    basins: List[str]


class SummaryText(BaseModel):
    es: str
    en: str


class SummaryStats(BaseModel):
    min: Optional[float]
    max: Optional[float]
    avg: Optional[float]
    count: int
    text: SummaryText


class MapValue(BaseModel):
    region: Optional[str]
    basin: Optional[str]
    value: float


class SeriesPoint(BaseModel):
    year: int
    value: float
    index: str


class DataResponse(BaseModel):
    mapValues: List[MapValue]
    series: List[SeriesPoint]
    summary: SummaryStats
