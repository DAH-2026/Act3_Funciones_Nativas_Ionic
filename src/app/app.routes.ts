import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'alta',
    loadComponent: () =>
      import('./features/addReport/addReport.page').then((m) => m.AltaPage),
  },
  {
    path: 'listado',
    loadComponent: () =>
      import('./features/reportList/reportList.page').then(
        (m) => m.ListadoPage,
      ),
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./features/home/home.page').then((m) => m.InicioPage),
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: 'inicio' },
];
