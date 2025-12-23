# Architecture

- **Frontend:** React + Vite (`apps/web`) with TypeScript, React Router, React
  Query for data fetching, Leaflet for maps, and Plotly for charts. Configured
  for Netlify deploy via `netlify.toml`.
- **Backend:** FastAPI (`apps/api`) serving mock data from `data/processed` with
  endpoints `/health`, `/meta`, `/data`, and `/tiles-or-geojson`. Ready for
  Render deployment.
- **Shared package:** `packages/shared` hosts TypeScript types shared by the
  frontend.
- **Data:** Stored in `data/processed` with optional raw downloads in
  `data/raw`. Scripts in `/scripts` manage fetching and processing.
- **Tooling:** pnpm workspaces, eslint + prettier, vitest for the web, pytest
  for the API. CI pipeline runs lint/tests/build.
