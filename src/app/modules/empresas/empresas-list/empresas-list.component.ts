import { Component, inject } from '@angular/core';
import { HeaderStateService } from '../../../core/services/header-state.service';
import { Empresa } from '../../../core/models/empresa.model';
import { EmpresaService } from '../../../core/services/empresa.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EmpresaResumeComponent } from './empresa-resume/empresa-resume.component';

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  imports: [CommonModule, EmpresaResumeComponent],

  styleUrl: './empresas-list.component.scss',
})
export class EmpresasListComponent {
  private header = inject(HeaderStateService);
  private empresaService = inject(EmpresaService);

  empresas$: Observable<Empresa[]> = this.empresaService.getEmpresas();

  selectedEmpresa: Empresa | null = null;

  constructor() {
    this.header.showActionButton.set(true);
    this.header.title.set('Pedido de Abertura de Empresas');
  }

  onVisualizarEmpresa(empresa: Empresa) {
    this.selectedEmpresa = empresa;
  }
}
