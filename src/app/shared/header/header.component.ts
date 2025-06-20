/* eslint-disable @angular-eslint/prefer-inject */
import { Component } from '@angular/core';
import { HeaderStateService } from '../../core/services/header-state.service';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-header',

  standalone: true,
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(public readonly header: HeaderStateService) {}

  goToNovoPedido(): void {
    // seu redirecionamento aqui
  }
}
