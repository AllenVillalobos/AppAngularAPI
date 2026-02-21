import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from '../Interfaces/respuesta-api';
import { UsuarioInterface } from '../Interfaces/usuario-interface';
import { LoginInterface } from '../Interfaces/login-interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
private apiUrl = environment.endPoint + 'Usuario';

  constructor(private http: HttpClient) {
  }

  iniciarSesion(request: LoginInterface): Observable<RespuestaAPI> {

    return this.http.post<RespuestaAPI>(`${this.apiUrl}/IniciarSesion`, request);
  }

  lista(): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(`${this.apiUrl}/Lista`);
  }

  guardar(request: UsuarioInterface): Observable<RespuestaAPI> {

    return this.http.post<RespuestaAPI>(`${this.apiUrl}/Guardar`, request);
  }

  editar(request: UsuarioInterface): Observable<RespuestaAPI> {

    return this.http.put<RespuestaAPI>(`${this.apiUrl}/Editar`, request);
  }

    eliminar(id: number): Observable<RespuestaAPI> {

    return this.http.delete<RespuestaAPI>(`${this.apiUrl}/Eliminar/${id}`);
  }
}

