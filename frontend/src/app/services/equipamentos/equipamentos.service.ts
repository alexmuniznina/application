import { query } from '@angular/animations';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipamentoPayload } from 'src/app/dto/equipamento-payload.dto';
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

  adicionarEquipamento(equipamento: EquipamentoPayload) {
    const params = equipamento;
    return this.http.post(`${this.url}/equipamentos`, params);
  }

  getEquipamentosByUserId(usuario_id: number): Observable<Equipamento[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('usuario_id', usuario_id);
    return this.http.get<any>(`${this.url}/equipamentos`, {
      params: queryParams,
    });
  }

  apagarEquipamento(id: number) {
    return this.http.delete(`${this.url}/equipamentos/${id}`);
  }
}
