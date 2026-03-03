import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import type { Movie } from './interfaces/movie.interface';
import type {
  TmdbMovie,
  TmdbPopularResponse,
  TmdbSearchResponse,
} from './interfaces/tmdb-response.interface';
import type { MovieResponseDto } from './dto/movie-response.dto';

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

@Injectable()
export class MoviesService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.getOrThrow<string>('TMDB_API_KEY');
    this.baseUrl = this.configService.getOrThrow<string>('TMDB_BASE_URL');
  }

  private transformMovie(raw: TmdbMovie): Movie {
    return {
      id: raw.id,
      title: raw.title,
      overview: raw.overview,
      posterUrl: raw.poster_path
        ? `${POSTER_BASE_URL}${raw.poster_path}`
        : `${POSTER_BASE_URL}/placeholder.jpg`,
      releaseYear: raw.release_date ? raw.release_date.slice(0, 4) : 'N/A',
      rating: Math.round(raw.vote_average * 10) / 10,
      genreIds: raw.genre_ids,
    };
  }

  async getPopularMovies(page: number = 1): Promise<MovieResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<TmdbPopularResponse>(
          `${this.baseUrl}/movie/popular`,
          {
            params: {
              api_key: this.apiKey,
              page,
            },
          },
        ),
      );

      const data = response.data;
      return {
        movies: data.results.map((movie) => this.transformMovie(movie)),
        page: data.page,
        totalPages: data.total_pages,
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to fetch movies';
      throw new InternalServerErrorException(
        `TMDB API error: ${message}`,
      );
    }
  }

  async searchMovies(query: string, page: number = 1): Promise<MovieResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<TmdbSearchResponse>(
          `${this.baseUrl}/search/movie`,
          {
            params: {
              api_key: this.apiKey,
              query,
              page,
            },
          },
        ),
      );

      const data = response.data;
      return {
        movies: data.results.map((movie) => this.transformMovie(movie)),
        page: data.page,
        totalPages: data.total_pages,
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to search movies';
      throw new InternalServerErrorException(`TMDB API error: ${message}`);
    }
  }
}
