import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from './../../shared/constants';
import { Observable } from 'rxjs';
import { Servico } from 'src/app/dto/servico.dto';

@Injectable({
  providedIn: 'root',
})
export class ServicosService {
  url = constants.apiUrl;

  constructor(private http: HttpClient) {}

  getServicos() {
    return this.http.get(`${this.url}/servicos`);
  }

  getServicosByEmpresaId(empresa_id: number): Observable<Servico[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('empresa_id', empresa_id);
    return this.http.get<any>(`${this.url}/servicos`, { params: queryParams });
  }

  getServicosByDescricao(filters: string[]) {
    let query = '';
    for (let desc of filters) {
      query = query + (filters.indexOf(desc) > 0 ? '&' : '?') + 'tipo=' + desc;
    }
    return this.http.get(`${this.url}/servicos${query}`);
  }
}
