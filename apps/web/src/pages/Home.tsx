import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <section className="page home">
      <div className="hero">
        <h1>{t('home.title')}</h1>
        <p>{t('home.intro')}</p>
        <Link className="cta" to="/explore">
          {t('home.cta')}
        </Link>
      </div>
    </section>
  );
};

export default Home;
