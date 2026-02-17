import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from '../Interfaces/respuesta-api';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
   private apiUrl = environment.endPoint + 'Menu';

  constructor(private http: HttpClient) {
  }  

  lista(idUsuario: number): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(`${this.apiUrl}/Lista?idUsuario=${idUsuario}`);
  }
}
