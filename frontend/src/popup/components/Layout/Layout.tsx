import { ReactNode, useEffect, useState } from "react";
import styles from './Layout.module.scss';
import { Link, useLocation } from "react-router-dom";

const navData = [
  { path: '/', label: 'home' },
  { path: '/settings', label: 'settings' },
  { path: '/contacts', label: 'contacts' },
  { path: '/login', label: 'login' }
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      <header className={styles.layout}>
        <div className={styles.logo}>
          <span>PerfectStyles</span>
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
