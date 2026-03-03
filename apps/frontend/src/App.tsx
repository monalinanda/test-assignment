import { useState } from 'react';
import Layout from './components/Layout/Layout';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Loader from './components/Loader/Loader';
import { useGetPopularMoviesQuery, useSearchMoviesQuery } from './store/api/moviesApi';
import useDebounce from './hooks/useDebounce';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  const isSearching = debouncedQuery.trim().length > 0;

  const popular = useGetPopularMoviesQuery(1, { skip: isSearching });
  const search = useSearchMoviesQuery(
    { query: debouncedQuery.trim(), page: 1 },
    { skip: !isSearching },
  );

  const { data, isLoading, isError } = isSearching ? search : popular;

  const isEmpty = !isLoading && !isError && data?.movies.length === 0;

  return (
    <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      {isLoading && <Loader />}
      {isError && (
        <p style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--color-text-secondary)' }}>
          Failed to load movies. Please check that the backend is running.
        </p>
      )}
      {isEmpty && (
        <p style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--color-text-secondary)' }}>
          No movies found for "{debouncedQuery}".
        </p>
      )}
      {data && data.movies.length > 0 && <MovieGrid movies={data.movies} />}
    </Layout>
  );
}

export default App;
