import { Route } from '@angular/router';
import { EmpresasListComponent } from './empresas-list/empresas-list.component';
import { EmpresasFormComponent } from './empresas-form/empresas-form.component';

export const routes: Route[] = [
  {
    path: '',
    component: EmpresasListComponent,
  },
  {
    path: ':id/editar',
    component: EmpresasFormComponent,
  },
  {
    path: 'novo',
    component: EmpresasFormComponent,
  },
];
