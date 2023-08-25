import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chamado } from 'src/app/dto/chamado.dto';
import { constants } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ChamadosService {
  url = constants.apiUrl;
  private contentHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // Accept: 'application/json',
  });

  constructor(private http: HttpClient) {}

  criarChamado(chamado: Chamado) {
    return this.http.post(`${this.url}/chamados`, JSON.stringify(chamado), {
      headers: this.contentHeader,
    });
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
