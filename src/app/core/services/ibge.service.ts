import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../models/estado.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IbgeService {
  private readonly baseUrl = environment.apiIbgeUrl;

  private http: HttpClient = inject(HttpClient);

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.baseUrl}/localidades/estados`);
  }
}
