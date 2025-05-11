import { ReactNode, useEffect, useState } from "react";
import styles from './Layout.module.scss';
import logo from 'public/icons/perfect-styles.svg'
import { Link, useLocation } from "react-router";

const navData = [
  { path: '/', label: 'home' },
  { path: '/settings', label: 'settings' },
  { path: '/contacts', label: 'contacts' }
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [active, setActive] = useState<string>('');
  // const logoUrl = chrome.runtime.getURL('public/icons/perfect-styles.svg');
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      <header className={styles.layout}>
        <div className={styles.logo}>
            {!chrome.runtime ?  <img src={logo} alt="logo"/> :<img src={''}/> }
        </div>
        <nav className={styles.nav}>
          {navData.map((element) => (
            <Link
              key={element.path}
              to={element.path}
              className={`${styles.link} ${active === element.path ? styles.active : ''}`}
            >
              {element.label}
            </Link>
          ))}
        </nav>
      </header>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
