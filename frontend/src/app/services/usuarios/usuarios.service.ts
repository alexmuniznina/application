import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/dto/usuario.dto';
import { constants } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  url = constants.apiUrl;

  constructor(private http: HttpClient) {}

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<any>(`${this.url}/usuarios/${id}`);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<any>(`${this.url}/usuarios`);
  }
}
