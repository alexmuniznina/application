import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipamento } from 'src/app/dto/equipamento.dto';
import { constants } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class EquipamentosService {
  private url = constants.apiUrl;
  private contentHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  criarEquipamento(equipamento: Equipamento) {
    return this.http.post(
      `${this.url}/equipamentos`,
      JSON.stringify(equipamento),
      {
        headers: this.contentHeader,
      }
    );
  }

  getEquipamentosByUserId(usuarioId: number): Observable<Equipamento[]> {
    return this.http.get<any>(
      `${this.url}/equipamentos?usuarioId=${usuarioId}`
    );
  }

  apagarEquipamento(id: number) {
    return this.http.delete(`${this.url}/equipamentos/${id}`);
  }
}
