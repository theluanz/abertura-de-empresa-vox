import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pedido } from '../../../../core/models/pedido.model';

@Component({
  selector: 'app-empresa-resume',
  imports: [],
  templateUrl: './empresa-resume.component.html',
  styleUrl: './empresa-resume.component.scss',
})
export class EmpresaResumeComponent {
  @Input() pedido!: Pedido;
  @Output() clickVisualizarEvent = new EventEmitter<Pedido>();

  onClickVisualizar(): void {
    this.clickVisualizarEvent.emit(this.pedido);
  }
}
