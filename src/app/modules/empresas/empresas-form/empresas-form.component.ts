import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../../core/services/pedido.service';
import { Pedido } from '../../../core/models/pedido.model';
import { SharedModule } from '../../../shared/shared.module';
import { EntidadeRegistro } from '../../../core/models/entidade-registro.model';
import { HeaderStateService } from '../../../core/services/header-state.service';
import { Estado } from '../../../core/models/estado.model';
import { IbgeService } from '../../../core/services/ibge.service';
import { ModalSucessoService } from '../../../core/services/modal-sucesso.service';
import { cpfValidator } from '../../../core/validators/cpf-validators';
import { dataNascimentoValidator } from '../../../core/validators/data-nascimento-validator';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-empresas-form',
  imports: [SharedModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './empresas-form.component.html',
  styleUrl: './empresas-form.component.scss',
})
export class EmpresasFormComponent implements OnInit {
  private _pedidosService: PedidoService = inject(PedidoService);
  private _ibgeService = inject(IbgeService);
  private _formBuilder = inject(FormBuilder);
  private header = inject(HeaderStateService);

  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _pedidoId: string | null = this._activatedRoute.snapshot.paramMap.get('id');

  private modalSucesso: ModalSucessoService = inject(ModalSucessoService);

  pedido: Pedido | null = null;
  estados: Estado[] = [];

  entidades_registro: EntidadeRegistro[] = [];

  form_pedido: FormGroup = this._formBuilder.group({
    solicitante: this._formBuilder.group({
      ds_responsavel: ['', Validators.required],
      nu_cpf: ['', [Validators.required, cpfValidator]],
      date_nascimento: ['', [Validators.required, dataNascimentoValidator]],
    }),
    empresa: this._formBuilder.group({
      ds_nome_fantasia: ['', Validators.required],
      co_entidade_registro: [null, Validators.required],
      endereco: this._formBuilder.group({
        co_cep: ['', Validators.required],
        ds_logradouro: ['', Validators.required],
        co_numero: ['', Validators.required],
        ds_complemento: [''],
        ds_bairro: ['', Validators.required],
        ds_municipio: ['', Validators.required],
        co_uf: ['', Validators.required],
      }),
    }),
  });

  ngOnInit(): void {
    this.header.title.set('Solicitar Abertura de Empresa');
    this.header.showActionButton.set(false);

    this._pedidosService.getEntidadesRegistro().subscribe({
      next: (entidades: EntidadeRegistro[]) => {
        this.entidades_registro = entidades;
      },
      error: (error) => {
        console.error('Error fetching entidades registro:', error);
      },
    });

    this._ibgeService.getEstados().subscribe({
      next: (estados: Estado[]) => {
        this.estados = estados;
      },
      error: (error) => {
        console.error('Error fetching estados:', error);
      },
    });

    if (this._pedidoId) {
      this.header.title.set('Editar abertura de Empresa');

      this._pedidosService.getPedidoById(this._pedidoId).subscribe({
        next: (pedido: Pedido) => {
          this.pedido = pedido;
          this.form_pedido.patchValue({
            solicitante: {
              ds_responsavel: pedido.solicitante.ds_responsavel,
              nu_cpf: pedido.solicitante.nu_cpf,
              date_nascimento: pedido.solicitante.date_nascimento,
            },
            empresa: {
              ds_nome_fantasia: pedido.empresa.ds_nome_fantasia,
              co_entidade_registro: pedido.empresa.co_entidade_registro,
              endereco: {
                co_cep: pedido.empresa.endereco.co_cep,
                ds_logradouro: pedido.empresa.endereco.ds_logradouro,
                co_numero: pedido.empresa.endereco.co_numero,
                ds_complemento: pedido.empresa.endereco.ds_complemento,
                ds_bairro: pedido.empresa.endereco.ds_bairro,
                ds_municipio: pedido.empresa.endereco.ds_municipio,
                co_uf: pedido.empresa.endereco.co_uf,
              },
            },
          });
        },
        error: (error) => {
          console.error('Error fetching pedido:', error);
          this._router.navigate(['/empresas']);
        },
      });
    }
  }
  isInvalid(path: string): boolean {
    const control = this.form_pedido.get(path);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
  getError(path: string, errorKey: string): boolean {
    const control = this.form_pedido.get(path);
    return !!control?.errors?.[errorKey] && (control.dirty || control.touched);
  }

  salvar() {
    if (this.form_pedido.valid) {
      if (this._pedidoId) {
        this._pedidosService.atualizarPedido(this._pedidoId, this.form_pedido.value).subscribe({
          next: (pedido: Pedido) => {
            this.modalSucesso.open().afterClose(() => {
              this._router.navigate(['/empresas']);
            });
          },
          error: (error) => {
            console.error('Erro ao atualizar o pedido:', error);
          },
        });
      } else {
        this._pedidosService.salvarPedido(this.form_pedido.value).subscribe({
          next: (pedido: Pedido) => {
            this.modalSucesso.open().afterClose(() => {
              this._router.navigate(['/empresas']);
            });
          },
          error: (error) => {
            console.error('Erro ao salvar o pedido:', error);
          },
        });
      }
    } else {
      this.form_pedido.markAllAsTouched();
    }
  }
}
