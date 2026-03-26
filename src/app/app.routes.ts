import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'add',
    loadComponent: () =>
      import('./features/addReport/addReport.page').then(
        (m) => m.AddReportPage,
      ),
  },
  {
    path: 'report-list',
    loadComponent: () =>
      import('./features/reportList/reportList.page').then(
        (m) => m.ReportListPage,
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.page').then((m) => m.HomePage),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
