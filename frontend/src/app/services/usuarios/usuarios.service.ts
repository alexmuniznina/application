import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<any>(
      `${this.url}/usuarios`,
      JSON.stringify(usuario),
      {
        headers: this.contentHeader,
      }
    );
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<any>(
      `${this.url}/usuarios/${usuario.id}`,
      JSON.stringify(usuario),
      {
        headers: this.contentHeader,
      }
    );
  }
}
