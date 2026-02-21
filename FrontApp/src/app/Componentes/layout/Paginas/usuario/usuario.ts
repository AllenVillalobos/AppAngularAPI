import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalUsuario } from '../../Modales/modal-usuario/modal-usuario';
import { UsuarioService } from '../../../../Service/usuario-service';
import { UsuarioInterface } from '../../../../Interfaces/usuario-interface';
import { Utilidad } from '../../../../Reutilizable/utilidad';

import Swal from 'sweetalert2';
import { MatCardModule, MatCardTitle } from "@angular/material/card";
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

import { SharedModule } from '../../../../Reutilizable/shared/shared-module';

@Component({
  selector: 'app-usuario',
  imports: [MatCardModule, MatCardTitle, MatAnchor, MatIcon, SharedModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombreCompleto', 'correo', 'rolDescripcion', 'estado', 'acciones'];
  dataSource: UsuarioInterface[] = [];
  dataListaUsuarios = new MatTableDataSource(this.dataSource);

  @ViewChild(MatPaginator) paginador!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuarioService,
    private utilidad: Utilidad) {

  }

  obtenerUsuarios() {

    this.usuarioService.lista().
      subscribe({
        next: (datos) => {
          if (datos.status) {
            this.dataListaUsuarios.data = datos.value;
          } else {
            this.utilidad.mostrarMensaje("Error al cargar los usuarios", "Oops!");
          }
        },
        error: (error) => {
          this.utilidad.mostrarMensaje("Error al cargar los usuarios", "Error");
        }
      });

  }

  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator = this.paginador;
  }
  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  aplicarFiltroTabla(evento: Event) {
    const filtroValor = (evento.target as HTMLInputElement).value;
    this.dataListaUsuarios.filter = filtroValor.trim().toLowerCase();
  }

  abrirModalGuardar() {
    this.dialog.open(ModalUsuario, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerUsuarios();
      }
    });
  }

  abrirModalEditar(datosUsuario: UsuarioInterface) {
    this.dialog.open(ModalUsuario, {
      disableClose: true,
      data: datosUsuario 
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerUsuarios();
      }
    });
  }

  eliminarUsuario(datosUsuario: UsuarioInterface) {
    Swal.fire({
      title: '¿Estás seguro de eliminar el usuario?',
      text: datosUsuario.nombreCompleto,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminar(datosUsuario.idUsuario).subscribe({
          next: (respuesta) => {
            if (respuesta.status) {
              this.utilidad.mostrarMensaje("Usuario eliminado correctamente", "Éxito");
              this.obtenerUsuarios();
            } else {
              this.utilidad.mostrarMensaje("Error al eliminar el usuario", "Error");
            }
          },
          error: (error) => {
            this.utilidad.mostrarMensaje("Error al eliminar el usuario", "Error");
          }
        });
      }
    });
  }
}