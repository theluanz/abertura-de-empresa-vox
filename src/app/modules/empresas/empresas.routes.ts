import { Route } from '@angular/router';
import { EmpresasListComponent } from './empresas-list/empresas-list.component';

export const routes: Route[] = [
  {
    path: '',
    component: EmpresasListComponent,
  },
];
