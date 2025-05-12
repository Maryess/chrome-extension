import { Link, useLocation } from "react-router";
import styles from '../Layout.module.scss'
import { useEffect, useState } from "react";

const navData = [
    { path: '/', label: 'home' },
    { path: '/settings', label: 'settings' },
    { path: '/contacts', label: 'contacts' }
  ];

export const Navigation = () => {
    const [active, setActive] = useState<string>('');

    const location = useLocation();
    
    useEffect(() => {
      setActive(location.pathname);
    }, [location.pathname]);

    return(
        <nav className={styles.nav}>
            {navData.map((element) => 
                <Link
                    key={element.path}
                    to={element.path}
                    className={`${styles.link} ${active === element.path ? styles.active : ''}`}
                >
                    {element.label}
                </Link>
            )}
         </nav>
    )
}