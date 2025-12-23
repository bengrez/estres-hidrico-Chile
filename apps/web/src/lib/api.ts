import { DataResponse, MetaPayload } from '@shared/index';

const apiBase = import.meta.env.VITE_API_URL || '/api';

const withBase = (path: string) => `${apiBase.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

export const fetchMeta = async (): Promise<MetaPayload> => {
  const res = await fetch(withBase('meta'));
  if (!res.ok) throw new Error('Failed to load metadata');
  return res.json();
};

export const fetchGeoJson = async () => {
  const res = await fetch(withBase('tiles-or-geojson'));
  if (!res.ok) throw new Error('Failed to load geojson');
  return res.json();
};

export interface DataFilters {
  region?: string;
  basin?: string;
  year?: number;
  index?: string;
}

export const fetchData = async (filters: DataFilters): Promise<DataResponse> => {
  const params = new URLSearchParams();
  if (filters.region) params.append('region', filters.region);
  if (filters.basin) params.append('basin', filters.basin);
  if (filters.year !== undefined) params.append('year', String(filters.year));
  if (filters.index) params.append('index', filters.index);
  const res = await fetch(withBase(`data?${params.toString()}`));
  if (!res.ok) throw new Error('Failed to load data');
  return res.json();
};
