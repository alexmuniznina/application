import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getChamados(): Observable<Chamado[]> {
    return this.http.get<any>(`${this.url}/chamados`);
  }

  getChamadosById(id: number): Observable<Chamado[]> {
    return this.http.get<any>(`${this.url}/chamados/${id}`);
  }

  getChamadosByUsuario(id: number): Observable<any[]> {
    return this.http.get<any>(
      `${this.url}/chamados?usuarioId=${id}&_expand=empresa`
    );
  }
}
