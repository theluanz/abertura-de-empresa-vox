import { Route } from '@angular/router';

export const routes: Route[] = [
  { path: '', redirectTo: 'empresas', pathMatch: 'full' },
  {
    path: 'empresas',
    loadChildren: () => import('./modules/empresas/empresas.routes').then((m) => m.routes),
  },
  { path: '**', redirectTo: 'empresas' },
];
