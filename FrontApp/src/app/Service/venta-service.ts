import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from '../Interfaces/respuesta-api';
import { VentaInterface } from '../Interfaces/venta-interface';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private apiUrl = environment.endPoint + 'Venta';

  constructor(private http: HttpClient) {
  }

  historial(buscarPor:string, numeroVenta:string, fechaInicio:string, fechaFin:string): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(`${this.apiUrl}/Historial?buscarPor=${buscarPor}&numeroVenta=${numeroVenta}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }

  reporte(fechaInicio:string, fechaFin:string): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(`${this.apiUrl}/Reporte?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }
  
}
