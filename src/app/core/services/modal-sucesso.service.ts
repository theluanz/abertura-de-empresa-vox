import { inject, Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalSucessoComponent } from '../../shared/modal-sucesso/modal-sucesso.component';

@Injectable({
  providedIn: 'root',
})
export class ModalSucessoService {
  private modalService: BsModalService = inject(BsModalService);

  open(): ModalSucessoRef {
    const bsRef: BsModalRef = this.modalService.show(
      ModalSucessoComponent,
      { class: 'modal-dialog-centered' }, // centralizado verticalmente
    );

    return new ModalSucessoRef(bsRef);
  }
}

export class ModalSucessoRef {
  private callbacks: (() => void)[] = [];

  constructor(private bsRef: BsModalRef) {
    // dispara todos os callbacks quando o modal for fechado
    bsRef.onHidden?.subscribe(() => this.callbacks.forEach((cb) => cb()));
  }

  /** Registra função a ser executada depois que o modal fechar. */
  afterClose(cb: () => void): this {
    this.callbacks.push(cb);
    return this; // permite encadeamento
  }
}
