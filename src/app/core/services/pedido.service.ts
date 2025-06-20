import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../models/pedido.model';
import { EntidadeRegistro } from '../models/entidade-registro.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly baseUrl = environment.apiUrl;

  private http: HttpClient = inject(HttpClient);

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/empresas`);
  }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/empresas/${id}`);
  }

  salvarPedido(empresa: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.baseUrl}/empresas`, empresa);
  }

  atualizarPedido(id: number, empresa: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.baseUrl}/empresas/${id}`, empresa);
  }

  getEntidadesRegistro(): Observable<EntidadeRegistro[]> {
    return this.http.get<EntidadeRegistro[]>(`${this.baseUrl}/entidade-registro`);
  }
}
