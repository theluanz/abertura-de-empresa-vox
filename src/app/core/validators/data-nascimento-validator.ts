import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dataNascimentoValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) return null;

  const partes = value.split('/');
  console.log('Partes da data:', partes);
  if (partes.length !== 3) return { dataInvalida: true };

  const [dia, mes, ano] = partes.map(Number);
  const data = new Date(ano, mes - 1, dia);

  // Data inválida (ex: 31/02/2020)
  if (data.getFullYear() !== ano || data.getMonth() !== mes - 1 || data.getDate() !== dia) {
    return { dataInvalida: true };
  }

  const hoje = new Date();
  const idade =
    hoje.getFullYear() - ano - (hoje < new Date(hoje.getFullYear(), mes - 1, dia) ? 1 : 0);

  if (idade < 18) return { menorDeIdade: true };

  return null;
}
