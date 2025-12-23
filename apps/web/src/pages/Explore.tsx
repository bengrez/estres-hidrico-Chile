import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import FilterPanel from '../components/FilterPanel';
import MapView from '../components/MapView';
import DataCharts from '../components/DataCharts';
import SummaryCard from '../components/SummaryCard';
import Loader from '../components/Loader';
import { fetchData, fetchGeoJson, fetchMeta, DataFilters } from '../lib/api';
import { useTranslation } from 'react-i18next';

const Explore = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<DataFilters>({});
  const [level, setLevel] = useState<'basic' | 'intermediate' | 'advanced'>('basic');

  const metaQuery = useQuery({ queryKey: ['meta'], queryFn: fetchMeta });
  const geoQuery = useQuery({ queryKey: ['geojson'], queryFn: fetchGeoJson });
  const dataQuery = useQuery({ queryKey: ['data', filters], queryFn: () => fetchData(filters), enabled: !!metaQuery.data });

  useEffect(() => {
    if (metaQuery.data) {
      setFilters((prev) => ({
        region: prev.region ?? metaQuery.data.regions[0],
        index: prev.index ?? metaQuery.data.indices[0],
        year: prev.year ?? metaQuery.data.years[0],
        basin: prev.basin ?? metaQuery.data.basins[0]
      }));
    }
  }, [metaQuery.data]);

  if (metaQuery.isLoading) return <Loader label={t('explore.loading')} />;
  if (metaQuery.isError) return <p className="error">{t('explore.error')}</p>;

  return (
    <section className="page explore">
        <div className="page-header">
          <div>
            <h1>{t('explore.title')}</h1>
            <p>{t('explore.description')}</p>
          </div>
        </div>
      <div className="explore-grid">
        <FilterPanel
          meta={metaQuery.data}
          filters={filters}
          onChange={setFilters}
          level={level}
          onLevelChange={(v) => setLevel(v as 'basic' | 'intermediate' | 'advanced')}
        />
        <div className="explore-content">
          {dataQuery.isLoading ? (
            <Loader label={t('explore.loading')} />
          ) : dataQuery.isError ? (
            <p className="error">{t('explore.error')}</p>
          ) : (
            <>
              <MapView geojson={geoQuery.data} mapValues={dataQuery.data?.mapValues} />
              <DataCharts data={dataQuery.data} />
              <SummaryCard summary={dataQuery.data?.summary} />
            </>
          )}
        </div>
      </div>
      <div className="contextual">
        {filters.index && (
          <div className="index-explainer">
            <h3>{t(`indices.${filters.index}.label`, filters.index)}</h3>
            <p>{t(`indices.${filters.index}.description`, '')}</p>
            <p className="level-note">{t(`explore.filters.level_${level}`)}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Explore;
