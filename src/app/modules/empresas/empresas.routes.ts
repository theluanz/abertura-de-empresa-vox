import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpresasListComponent } from './empresas-list/empresas-list.component';
import { EmpresasFormComponent } from './empresas-form/empresas-form.component';

const routes: Routes = [
  {
    path: '',
    component: EmpresasListComponent,
  },
  {
    path: 'novo',
    component: EmpresasFormComponent,
  },
  {
    path: ':id/editar',
    component: EmpresasFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresasRoutingModule {}
