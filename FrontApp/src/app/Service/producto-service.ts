import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from '../Interfaces/respuesta-api';
import { ProductoInterface } from '../Interfaces/producto-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
   private apiUrl = environment.endPoint + 'Producto';

  constructor(private http: HttpClient) {
  }

  lista(): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(`${this.apiUrl}/Lista`);
  }

  guardar(request: ProductoInterface): Observable<RespuestaAPI> {

    return this.http.post<RespuestaAPI>(`${this.apiUrl}/Guardar`, request);
  }

  editar(request: ProductoInterface): Observable<RespuestaAPI> {

    return this.http.post<RespuestaAPI>(`${this.apiUrl}/Editar`, request);
  }

  eliminar(id: number): Observable<RespuestaAPI> {

    return this.http.delete<RespuestaAPI>(`${this.apiUrl}/Eliminar/${id}`);
  }
}

