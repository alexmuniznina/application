import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioPayload } from 'src/app/dto/usuario-payload.dto';
import { Usuario } from 'src/app/dto/usuario.dto';
import { constants } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  url = constants.apiUrl;
  private contentHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getUsuarioByEmail(email: string | null): Observable<Usuario> {
    return this.http.get<any>(`${this.url}/usuarios?email=${email}`);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<any>(`${this.url}/usuarios/${id}`);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<any>(`${this.url}/usuarios`);
  }

  criarUsuario(usuario: Usuario): Observable<Usuario> {
    const params = usuario;
    return this.http.post<any>(`${this.url}/usuarios`, params);
  }

  updateUsuario(usuario_id, usuario: UsuarioPayload): Observable<Usuario> {
    const params = usuario;
    return this.http.put<any>(`${this.url}/usuarios/${usuario_id}`, params);
  }
}
