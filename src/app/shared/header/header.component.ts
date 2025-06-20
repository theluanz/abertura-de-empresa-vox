/* eslint-disable @angular-eslint/prefer-inject */
import { Component, inject } from '@angular/core';
import { HeaderStateService } from '../../core/services/header-state.service';
import { SharedModule } from '../shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',

  standalone: true,
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  constructor(public readonly header: HeaderStateService) {}

  goToNovoPedido(): void {
    this.router.navigate(['/empresas/novo']);
  }
}
