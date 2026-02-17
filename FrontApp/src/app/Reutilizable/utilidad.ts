import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SesionInterface } from '../Interfaces/sesion-interface';

@Injectable({
  providedIn: 'root',
})
export class Utilidad {
  constructor(private snackBar: MatSnackBar) { }

  mostrarMensaje(mensaje: string, tipo: string) {
    this.snackBar.open(mensaje, tipo, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  guardarSesion(sesion: SesionInterface) {
    localStorage.setItem('usuario', JSON.stringify(sesion));
  }

  obtenerSesion(){
    const sesionString = localStorage.getItem('usuario');
    const usuario = JSON.parse(sesionString!);
    return usuario;
  }

  eliminarSesion() {
    localStorage.removeItem('usuario');
  }
}
