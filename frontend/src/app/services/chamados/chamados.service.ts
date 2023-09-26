import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chamado } from 'src/app/dto/chamado.dto';
import { ChamadoPayload } from 'src/app/dto/chamado-payload.dto';
import { constants } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ChamadosService {
  url = constants.apiUrl;
  private contentHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  criarChamado(chamado: ChamadoPayload) {
    const params = chamado;
    return this.http.post(`${this.url}/chamados`, params);
  }

  getChamadosByUsuario(usuario_id: number): Observable<Chamado[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('usuario_id', usuario_id);
    return this.http.get<any>(`${this.url}/chamados`, {
      params: queryParams,
    });
  }

  getChamados(): Observable<Chamado[]> {
    return this.http.get<any>(`${this.url}/chamados`);
  }

  getChamadosById(id: number): Observable<Chamado[]> {
    return this.http.get<any>(`${this.url}/chamados/${id}`);
  }

  getChamadosByEmpresaNome(
    usuario_id: number,
    nome_fantasia: string
  ): Observable<Chamado[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('usuario_id', usuario_id);
    return this.http.get<any>(`${this.url}/chamados/${nome_fantasia}`, {
      params: queryParams,
    });
  }
}
