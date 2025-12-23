import { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="branding">
          <Link to="/">Estrés Hídrico Chile</Link>
          <p className="tagline">{t('layout.subtitle')}</p>
        </div>
        <nav>
          <NavLink to="/" end>
            {t('layout.nav.home')}
          </NavLink>
          <NavLink to="/explore">{t('layout.nav.explore')}</NavLink>
          <NavLink to="/learn">{t('layout.nav.learn')}</NavLink>
        </nav>
        <LanguageSwitcher />
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">{t('layout.footer')}</footer>
    </div>
  );
};

export default Layout;
