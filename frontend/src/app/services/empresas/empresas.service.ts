import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from './../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  url = constants.apiUrl;

  constructor(private http: HttpClient) {}

  getEmpresas() {
    return this.http.get(`${this.url}/empresas`);
  }

  getEmpresasByName(name: string) {
    return this.http.get(`${this.url}/empresas?nomeFantasia_like=${name}`);
  }
}
