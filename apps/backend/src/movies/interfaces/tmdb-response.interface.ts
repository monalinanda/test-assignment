export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  adult: boolean;
  backdrop_path: string | null;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
}

export interface TmdbPopularResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

// Search uses the same paginated structure as popular
export type TmdbSearchResponse = TmdbPopularResponse;
