import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from './../../shared/constants';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/dto/empresa.dto';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  url = constants.apiUrl;

  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<any>(`${this.url}/empresas`);
  }

  getEmpresasByName(name: string): Observable<Empresa[]> {
    return this.http.get<any>(`${this.url}/empresas?nomeFantasia_like=${name}`);
  }

  getEmpresaById(id: number): Observable<Empresa> {
    return this.http.get<any>(`${this.url}/empresas/${id}`);
  }

  getEmpresaChamadosByNome(nome: string): Observable<Empresa> {
    return this.http.get<any>(
      `${this.url}/empresas?nomeFantasia_like=${nome}&_embed=chamados`
    );
  }
}
