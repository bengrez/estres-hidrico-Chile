# Data sources

This repository ships with mock data stored under `data/processed` so the
frontend and API are fully functional without external dependencies. Replace
these files with official datasets when available:

- `regions.geojson`: sample polygons named Región A/B/C. Swap with official
  region or basin boundaries.
- `index_values.json`: toy values for WATER_STRESS and DROUGHT_RISK across
  2018–2020.

A minimal ingestion pipeline is provided via `scripts/fetch_sources.py` (to
download raw files from `SOURCE_URL`) and `scripts/build_processed.py` (stub to
inspect/convert raw files). Extend these scripts to normalize real datasets.
