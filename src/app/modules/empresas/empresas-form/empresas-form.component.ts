import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../../core/services/pedido.service';
import { Pedido } from '../../../core/models/pedido.model';
import { SharedModule } from '../../../shared/shared.module';
import { EntidadeRegistro } from '../../../core/models/entidade-registro.model';
import { HeaderStateService } from '../../../core/services/header-state.service';

@Component({
  selector: 'app-empresas-form',
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './empresas-form.component.html',
  styleUrl: './empresas-form.component.scss',
})
export class EmpresasFormComponent implements OnInit {
  private _pedidosService: PedidoService = inject(PedidoService);
  private _formBuilder = inject(FormBuilder);
  private header = inject(HeaderStateService);

  private _activatedRoute = inject(ActivatedRoute);
  private _pedidoId: string | null = this._activatedRoute.snapshot.paramMap.get('id');

  pedido: Pedido | null = null;

  entidades_registro: EntidadeRegistro[] = [];

  form_pedido: FormGroup = this._formBuilder.group({
    solicitante: this._formBuilder.group({
      ds_responsavel: ['', Validators.required],
      nu_cpf: ['', Validators.required],
      date_nascimento: ['', [Validators.required]],
    }),
    empresa: this._formBuilder.group({
      ds_nome_fantasia: ['', Validators.required],
      co_entidade_registro: this._formBuilder.control(null, Validators.required),
      endereco: this._formBuilder.group({
        co_cep: ['', [Validators.required]],
        ds_logradouro: ['', Validators.required],
        co_numero: [null, Validators.required],
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
        },
      });
    }
  }
  isInvalid(path: string): boolean {
    const control = this.form_pedido.get(path);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  salvar() {
    if (this.form_pedido.valid) {
      console.log('Formulário válido, dados:', this.form_pedido.value);
      // implementar ação de salvar
    } else {
      this.form_pedido.markAllAsTouched();
    }
  }
}
