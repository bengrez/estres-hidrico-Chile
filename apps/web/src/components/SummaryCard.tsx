import { SummaryStats } from '@shared/index';
import { useTranslation } from 'react-i18next';

interface Props {
  summary?: SummaryStats;
}

const SummaryCard = ({ summary }: Props) => {
  const { i18n, t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="summary-card">
      <h3>{t('explore.summary.title')}</h3>
      <ul>
        <li>
          <strong>Min:</strong> {summary.min ?? '—'}
        </li>
        <li>
          <strong>Max:</strong> {summary.max ?? '—'}
        </li>
        <li>
          <strong>Avg:</strong> {summary.avg ?? '—'}
        </li>
        <li>
          <strong>N:</strong> {summary.count}
        </li>
      </ul>
      <p className="summary-copy">{summary.text[i18n.language as 'es' | 'en']}</p>
    </div>
  );
};

export default SummaryCard;
