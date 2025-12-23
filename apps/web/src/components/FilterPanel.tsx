import { MetaPayload, WaterIndex } from '@shared/index';
import { useTranslation } from 'react-i18next';
import { DataFilters } from '../lib/api';

interface Props {
  meta?: MetaPayload;
  filters: DataFilters;
  onChange: (filters: DataFilters) => void;
  level: string;
  onLevelChange: (level: string) => void;
}

const FilterPanel = ({ meta, filters, onChange, level, onLevelChange }: Props) => {
  const { t } = useTranslation();

  const handleSelect = (field: keyof DataFilters, value?: string) => {
    onChange({ ...filters, [field]: value || undefined });
  };

  const handleYear = (value?: string) => {
    onChange({ ...filters, year: value ? Number(value) : undefined });
  };

  const renderOptions = (items: string[]) =>
    items.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ));

  return (
    <aside className="panel filters">
      <h3>{t('explore.title')}</h3>
      <label className="field">
        <span>{t('explore.filters.region')}</span>
        <select
          value={filters.region ?? ''}
          onChange={(e) => handleSelect('region', e.target.value)}
          aria-label={t('explore.filters.region')}
        >
          <option value="">--</option>
          {meta && renderOptions(meta.regions)}
        </select>
      </label>
      <label className="field">
        <span>{t('explore.filters.basin')}</span>
        <select
          value={filters.basin ?? ''}
          onChange={(e) => handleSelect('basin', e.target.value)}
          aria-label={t('explore.filters.basin')}
        >
          <option value="">--</option>
          {meta && renderOptions(meta.basins)}
        </select>
      </label>
      <label className="field">
        <span>{t('explore.filters.index')}</span>
        <select
          value={filters.index ?? ''}
          onChange={(e) => handleSelect('index', e.target.value as WaterIndex)}
          aria-label={t('explore.filters.index')}
        >
          <option value="">--</option>
          {meta && renderOptions(meta.indices as string[])}
        </select>
      </label>
      <label className="field">
        <span>{t('explore.filters.year')}</span>
        <select
          value={filters.year ?? ''}
          onChange={(e) => handleYear(e.target.value)}
          aria-label={t('explore.filters.year')}
        >
          <option value="">--</option>
          {meta && meta.years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>{t('explore.filters.level')}</span>
        <select value={level} onChange={(e) => onLevelChange(e.target.value)}>
          <option value="basic">{t('explore.filters.level_basic')}</option>
          <option value="intermediate">{t('explore.filters.level_intermediate')}</option>
          <option value="advanced">{t('explore.filters.level_advanced')}</option>
        </select>
      </label>
    </aside>
  );
};

export default FilterPanel;
