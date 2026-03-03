import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Movie } from '../../types/movie';

interface MoviesResponse {
  movies: Movie[];
  page: number;
  totalPages: number;
}

interface SearchMoviesArg {
  query: string;
  page: number;
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MoviesResponse, number>({
      query: (page = 1) => `/movies/popular?page=${page}`,
    }),
    searchMovies: builder.query<MoviesResponse, SearchMoviesArg>({
      query: ({ query, page = 1 }) =>
        `/movies/search?query=${encodeURIComponent(query)}&page=${page}`,
    }),
  }),
});

export const { useGetPopularMoviesQuery, useSearchMoviesQuery } = moviesApi;
