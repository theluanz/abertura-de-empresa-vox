import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'empresas',
    loadChildren: () => import('./modules/empresas/empresas.module').then((m) => m.EmpresasModule),
  },
  {
    path: '',
    redirectTo: 'empresas',
    pathMatch: 'full',
  },
  { path: '', redirectTo: 'empresas', pathMatch: 'full' },
];
