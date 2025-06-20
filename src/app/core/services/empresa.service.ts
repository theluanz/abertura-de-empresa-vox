import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../models/empresa.model';
import { EntidadeRegistro } from '../models/entidade-registro.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private readonly baseUrl = environment.apiUrl;

  private http: HttpClient = inject(HttpClient);

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.baseUrl}/empresas`);
  }

  getEmpresaById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.baseUrl}/empresas/${id}`);
  }

  salvarEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(`${this.baseUrl}/empresas`, empresa);
  }

  atualizarEmpresa(id: number, empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.baseUrl}/empresas/${id}`, empresa);
  }

  getEntidadesRegistro(): Observable<EntidadeRegistro[]> {
    return this.http.get<EntidadeRegistro[]>(`${this.baseUrl}/entidade-registro`);
  }
}
