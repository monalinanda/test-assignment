import { Controller, Get, Query, ParseIntPipe, DefaultValuePipe, BadRequestException } from '@nestjs/common';
import { MoviesService } from './movies.service';
import type { MovieResponseDto } from './dto/movie-response.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('popular')
  getPopularMovies(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<MovieResponseDto> {
    return this.moviesService.getPopularMovies(page);
  }

  @Get('search')
  searchMovies(
    @Query('query') query: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<MovieResponseDto> {
    if (!query || query.trim().length === 0) {
      throw new BadRequestException('query param must be a non-empty string');
    }
    return this.moviesService.searchMovies(query.trim(), page);
  }
}
