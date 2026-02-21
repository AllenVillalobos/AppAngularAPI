import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleInterface } from '../../../../Interfaces/role-interface';
import { UsuarioInterface } from '../../../../Interfaces/usuario-interface';

import { UsuarioService } from '../../../../Service/usuario-service';
import { RolService } from '../../../../Service/rol-service';
import { Utilidad } from '../../../../Reutilizable/utilidad';
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { MatFormField } from "@angular/material/input";
import { SharedModule } from "../../../../Reutilizable/shared/shared-module";

@Component({
  selector: 'app-modal-usuario',
  imports: [MatGridList, MatGridTile, MatFormField, SharedModule],
  templateUrl: './modal-usuario.html',
  styleUrl: './modal-usuario.css',
})

export class ModalUsuario implements OnInit {

  formularioUsuario: FormGroup;
  ocultarContrasena: boolean = true;
  tituloAccion: string = 'Agregar Usuario';
  botinAccion: string = 'Guardar';
  listaRoles: RoleInterface[] = [];

  constructor(private modalActual: MatDialogRef<ModalUsuario>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: UsuarioInterface,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private utilidad: Utilidad
  ) {

    this.formularioUsuario = this.fb.group({
      nombreCompleto: ['', Validators.required],
      correo: ['',[Validators.required, Validators.email]],
      idRol: ['', Validators.required],
      clave: ['', Validators.required],
      esActivo: ["1", Validators.required]
    });

    if (this.datosUsuario != null) {
      this.tituloAccion = "Editar Usuario";
      this.botinAccion = "Actualizar";
    }

    this.rolService.lista().
      subscribe({
        next: (datos) => {
          if (datos.status) {
            this.listaRoles = datos.value;
          }
        },
        error: (error) => {
          this.utilidad.mostrarMensaje("Error al cargar los roles", "Error");
         }
      });
  }
  ngOnInit(): void {
    if (this.datosUsuario != null) {
      this.formularioUsuario.patchValue({
        nombreCompleto: this.datosUsuario.nombreCompleto,
        correo: this.datosUsuario.correo,
        idRol: this.datosUsuario.idRol,
        clave: this.datosUsuario.clave,
        esActivo: this.datosUsuario.esActivo.toString()
      });
    }
  }

  guardarEditar_EditarUsuario() {
    const usuario: UsuarioInterface = {
      idUsuario: this.datosUsuario != null ? this.datosUsuario.idUsuario : 0,
      nombreCompleto: this.formularioUsuario.value.nombreCompleto,
      correo: this.formularioUsuario.value.correo,
      idRol: Number(this.formularioUsuario.value.idRol),
      rolDescripcion: "",
      clave: this.formularioUsuario.value.clave,
      esActivo: parseInt(this.formularioUsuario.value.esActivo)
    }

    if (this.datosUsuario == null) {
      this.usuarioService.guardar(usuario).
      subscribe({
        next: (response) => {
          if (response.status) {
            this.utilidad.mostrarMensaje("Usuario guardado con éxito", "Éxito");
            this.modalActual.close("true");
          }else{
            this.utilidad.mostrarMensaje("No se pudo guardar el usuario", "Error");
          }
        },
        error: (error) => {
          this.utilidad.mostrarMensaje("Error al guardar el usuario", "Error");
        }
      });
    }else{
      this.usuarioService.editar(usuario).
      subscribe({
        next: (response) => {
          if (response.status) {
            this.utilidad.mostrarMensaje("Usuario actualizado con éxito", "Éxito");
            this.modalActual.close("true");
          }else{
            this.utilidad.mostrarMensaje("No se pudo actualizar el usuario", "Error");
          }
        },
        error: (error) => {
          this.utilidad.mostrarMensaje("Error al actualizar el usuario: " + error.message, "Error");
        }
      });
    }
  }
}
