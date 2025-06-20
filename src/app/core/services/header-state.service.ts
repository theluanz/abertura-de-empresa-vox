import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderStateService {
  title = signal<string>('Pedido de Abertura de Empresas');
  showActionButton = signal<boolean>(true);
}
