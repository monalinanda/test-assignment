import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from './api/moviesApi';
import asyncTimingMiddleware from './middleware/asyncTimingMiddleware';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware, asyncTimingMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
