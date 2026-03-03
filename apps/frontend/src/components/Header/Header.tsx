import SearchBar from '../SearchBar/SearchBar';
import styles from './Header.module.css';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Movie Library</h1>
        <div className={styles.searchWrapper}>
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>
      </div>
    </header>
  );
}

export default Header;
