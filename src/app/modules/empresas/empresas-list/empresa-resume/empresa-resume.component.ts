import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Empresa } from '../../../../core/models/empresa.model';

@Component({
  selector: 'app-empresa-resume',
  imports: [],
  templateUrl: './empresa-resume.component.html',
  styleUrl: './empresa-resume.component.scss',
})
export class EmpresaResumeComponent {
  @Input() empresa!: Empresa;
  @Output() clickVisualizarEvent = new EventEmitter<Empresa>();

  onClickVisualizar(): void {
    this.clickVisualizarEvent.emit(this.empresa);
  }
}
