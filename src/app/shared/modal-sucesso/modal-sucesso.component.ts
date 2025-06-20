import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-modal-sucesso',
  imports: [SharedModule],
  templateUrl: './modal-sucesso.component.html',
  styleUrl: './modal-sucesso.component.scss',
})
export class ModalSucessoComponent {
  public bsModalRef: BsModalRef = inject(BsModalRef);

  close(): void {
    this.bsModalRef.hide();
  }
}
