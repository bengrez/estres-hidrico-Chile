import { MapContainer, TileLayer, GeoJSON as GeoJSONLayer, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { MapValue } from '@shared/index';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { GeoJsonObject } from 'geojson';

interface Props {
  geojson?: GeoJsonObject;
  mapValues?: MapValue[];
}

const MapView = ({ geojson, mapValues }: Props) => {
  const { t } = useTranslation();

  useEffect(() => {
    // Fix default marker icon paths in Leaflet
    // @ts-expect-error - accessing private prop for asset resolution
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString(),
      iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString(),
      shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString()
    });
  }, []);

  const dataLookup = useMemo(() => {
    const lookup: Record<string, number> = {};
    mapValues?.forEach((entry) => {
      if (entry.region) {
        lookup[entry.region] = entry.value;
      }
    });
    return lookup;
  }, [mapValues]);

  const getColor = (value?: number) => {
    if (value === undefined || Number.isNaN(value)) return '#d9e3f0';
    if (value > 0.75) return '#084081';
    if (value > 0.6) return '#0868ac';
    if (value > 0.45) return '#2b8cbe';
    if (value > 0.3) return '#4eb3d3';
    return '#7bccc4';
  };

  return (
    <div className="map-card">
      <div className="map-header">
        <h3>{t('explore.map.title')}</h3>
        <span className="legend">{t('explore.map.legend')}</span>
      </div>
      <div className="map-wrapper">
        <MapContainer center={[-33.45, -70.66]} zoom={4} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {geojson && (
            <GeoJSONLayer
              data={geojson}
              style={(feature) => {
                const name = feature?.properties?.name as string;
                const value = dataLookup[name];
                return {
                  color: '#ffffff',
                  weight: 1,
                  fillColor: getColor(value),
                  fillOpacity: 0.9
                };
              }}
              onEachFeature={(feature, layer) => {
                const name = feature?.properties?.name as string;
                const value = dataLookup[name];
                if (name) {
                  layer.bindTooltip(
                    () => `<strong>${name}</strong><br/>${value !== undefined ? value.toFixed(2) : '—'}`,
                    { sticky: true }
                  );
                }
              }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
