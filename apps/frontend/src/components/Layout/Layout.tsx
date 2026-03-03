import type { ReactNode } from 'react';
import Header from '../Header/Header';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

function Layout({ children, searchQuery, onSearchChange }: LayoutProps) {
  return (
    <div className={styles.wrapper}>
      <Header searchQuery={searchQuery} onSearchChange={onSearchChange} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
