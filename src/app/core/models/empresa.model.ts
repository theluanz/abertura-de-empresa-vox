export interface Empresa {
  id?: number;
  solicitante: Solicitante;
  empresa: EmpresaData;
}

export interface Endereco {
  co_cep: number;
  ds_logradouro: string;
  co_numero: string;
  ds_complemento: string | null;
  ds_bairro: string;
  ds_municipio: string;
  co_uf: string;
}

export interface EmpresaData {
  ds_nome_fantasia: string;
  co_entidade_registro: number;
  endereco: Endereco;
}

export interface Solicitante {
  ds_responsavel: string;
  nu_cpf: string;
  date_nascimento: string;
}
