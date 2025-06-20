import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep',
})
export class CepPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value == null) return '';
    const raw = value.toString().padStart(8, '0');
    return raw.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }
}
