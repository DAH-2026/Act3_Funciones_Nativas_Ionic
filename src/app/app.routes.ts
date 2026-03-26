import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'alta',
    loadComponent: () =>
      import('./features/alta/alta.page').then((m) => m.AltaPage),
  },
  {
    path: 'listado',
    loadComponent: () =>
      import('./features/listado/listado.page').then((m) => m.ListadoPage),
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./features/inicio/inicio.page').then((m) => m.InicioPage),
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: 'inicio' },
];
