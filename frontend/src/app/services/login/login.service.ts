import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/dto/usuario.dto';
import { constants } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = constants.apiUrl;

  constructor(private http: HttpClient) {}

  getUserInfo(email: string | null): Observable<Usuario> {
    return this.http.get<any>(`${this.url}/login/${email}`);
  }
}
