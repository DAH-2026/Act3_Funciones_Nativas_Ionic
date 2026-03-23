import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/tabMovies/tabMovies.page').then(
        (m) => m.TabMoviesPage,
      ),
  },
  {
    path: 'detail-movie/:id',
    loadComponent: () =>
      import('./features/detail-movie/detail-movie.page').then(
        (m) => m.DetailMoviePage,
      ),
  },
];
