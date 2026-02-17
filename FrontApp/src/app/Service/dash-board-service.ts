import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from '../Interfaces/respuesta-api';
import { VentaInterface } from '../Interfaces/venta-interface';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService {
     private apiUrl = environment.endPoint + 'Usuarios';
  
    constructor(private http: HttpClient) {
    }
  
    resumen(): Observable<RespuestaAPI> {
      return this.http.get<RespuestaAPI>(`${this.apiUrl}/Resumen`);
    }
  
}

