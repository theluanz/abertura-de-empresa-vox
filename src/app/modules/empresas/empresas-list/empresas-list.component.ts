import { Component, inject } from '@angular/core';
import { HeaderStateService } from '../../../core/services/header-state.service';
import { Pedido } from '../../../core/models/pedido.model';
import { PedidoService } from '../../../core/services/pedido.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EmpresaResumeComponent } from './empresa-resume/empresa-resume.component';
import { EmpresaDetailComponent } from './empresa-detail/empresa-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  imports: [CommonModule, EmpresaResumeComponent, EmpresaDetailComponent],

  styleUrl: './empresas-list.component.scss',
})
export class EmpresasListComponent {
  private header = inject(HeaderStateService);
  private pedidosService = inject(PedidoService);
  private router = inject(Router);

  pedidos$: Observable<Pedido[]> = this.pedidosService.getPedidos();

  selectedPedido: Pedido | null = null;

  constructor() {
    this.header.showActionButton.set(true);
    this.header.title.set('Pedido de Abertura de Empresas');
  }

  onVisualizarEmpresa(pedido: Pedido) {
    this.selectedPedido = pedido;
  }

  onEditar(pedido: Pedido) {
    this.router.navigate(['/empresas', pedido.id, 'editar']);
  }
}
