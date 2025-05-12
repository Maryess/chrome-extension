import { ReactNode, useEffect, useState } from "react";
import styles from './Layout.module.scss';
import { Navigation } from "./ui/Navigation";
import { Logo } from "./ui/Logo";

export const Layout = ({ children }: { children: ReactNode }) => {

  return (
    <div className={styles.container}>
      <header className={styles.layout}>
        <Logo/>
        <Navigation />
      </header>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
