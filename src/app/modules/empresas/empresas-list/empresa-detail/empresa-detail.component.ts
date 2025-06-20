import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pedido } from '../../../../core/models/pedido.model';
import { SharedModule } from '../../../../shared/shared.module';
import { CpfPipe } from '../../../../core/pipe/cpf.pipe';
import { CepPipe } from '../../../../core/pipe/cep.pipe';

@Component({
  selector: 'app-empresa-detail',
  imports: [SharedModule, CepPipe, CpfPipe],
  templateUrl: './empresa-detail.component.html',
  styleUrl: './empresa-detail.component.scss',
})
export class EmpresaDetailComponent {
  @Input() pedido!: Pedido;

  @Output() editar = new EventEmitter<Pedido>();

  onEditar(): void {
    // console.log('Editar pedido:', this.pedido);
    this.editar.emit(this.pedido);
  }

  cpfFormat(cpf: string): string {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }

  cepFormat(cep: number | string): string {
    const raw = cep.toString().padStart(8, '0');
    return raw.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }
}
