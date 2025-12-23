export type WaterIndex = "WATER_STRESS" | "DROUGHT_RISK" | string;

export interface IndexValue {
  year: number;
  index: WaterIndex;
  region?: string;
  basin?: string;
  value: number;
}

export interface MetaPayload {
  years: number[];
  indices: WaterIndex[];
  regions: string[];
  basins: string[];
}

export interface MapValue {
  region?: string;
  basin?: string;
  value: number;
}

export interface SeriesPoint {
  year: number;
  value: number;
  index: WaterIndex;
}

export interface SummaryCopy {
  es: string;
  en: string;
}

export interface SummaryStats {
  min: number | null;
  max: number | null;
  avg: number | null;
  count: number;
  text: SummaryCopy;
}

export interface DataResponse {
  mapValues: MapValue[];
  series: SeriesPoint[];
  summary: SummaryStats;
}
