import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from './../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ServicosService {
  url = constants.apiUrl;

  constructor(private http: HttpClient) {}

  getServicos() {
    return this.http.get(`${this.url}/servicos`);
  }

  getServicosByDescricao(filters: string[]) {
    let query = '';
    for (let desc of filters) {
      query = query + (filters.indexOf(desc) > 0 ? '&' : '?') + 'tipo=' + desc;
    }
    return this.http.get(`${this.url}/servicos${query}`);
  }
}
