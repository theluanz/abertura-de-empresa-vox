import { Component, inject } from '@angular/core';
import { HeaderStateService } from '../../../core/services/header-state.service';

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrl: './empresas-list.component.scss',
})
export class EmpresasListComponent {
  private header = inject(HeaderStateService);

  constructor() {
    this.header.showActionButton.set(true);
    this.header.title.set('Pedido de Abertura de Empresas');
  }
}
