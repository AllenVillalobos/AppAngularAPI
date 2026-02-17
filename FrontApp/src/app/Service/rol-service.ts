import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from '../Interfaces/respuesta-api';

@Injectable({
  providedIn: 'root',
})
export class RolService {
     private apiUrl = environment.endPoint + 'Rol';
 
   constructor(private http: HttpClient) {
   }
   lista(): Observable<RespuestaAPI> {
     return this.http.get<RespuestaAPI>(`${this.apiUrl}/Lista`);
   }
  
}
