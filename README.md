# Entain Movie App

A movie library application built with NestJS backend and React frontend, integrating with The Movie Database (TMDB) API.

## Features

- **Popular Movies**: Browse Propular movies
- **Search Movies**: Search for movies by title
- **Genre Filtering**: Filter movies by genre
- **Recent Searches**: Recent search queries (lIFO)
- **Responsive Design**: Mobile-friendly UI

## Tech Stack

### Backend
- **NestJS**: Node.js framework for scalable server-side applications
- **Axios**: HTTP client for TMDB API integration
- **TypeScript**: For Type-safe development

### Frontend
- **React**: UI library with hooks
- **Redux Toolkit Query (RTK Query)**: Data fetching 
- **Vite**: Fast build tool and dev server
- **CSS Modules**: Scoped styling

### Development
- **pnpm**: Package manager for monorepo

## Prerequisites

- Node.js (v18 or higher)
- pnpm
- TMDB API Key (get from [TMDB](https://www.themoviedb.org/settings/api))

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/monalinanda/entain-assignment.git
   cd entain-assignment
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:

   Create `.env` file in `apps/backend/`:
   ```
   TMDB_API_KEY=your_tmdb_api_key_here
   TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

   Optionally, create `.env` in `apps/frontend/` if needed:
   ```
   VITE_API_URL=http://localhost:3000

### Development

1. Start the backend:
   ```bash
   pnpm run dev:backend
   ```

2. Start the frontend:
   ```bash
   pnpm run dev:frontend
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

1. Build the backend:
   ```bash
   cd apps/backend
   pnpm run build
   ```

2. Build the frontend:
   ```bash
   cd apps/frontend
   pnpm run build
   ```

## API Endpoints

### Backend (NestJS)

- `GET /movies/popular?page=1` - Get popular movies
- `GET /movies/search?query=movie&page=1` - Search movies
- `GET /movies/genres` - Get movie genres
- `GET /movies/discover?genreId=28&page=1` - Get movies by genre

All endpoints return JSON with movie data, pagination info, etc.
