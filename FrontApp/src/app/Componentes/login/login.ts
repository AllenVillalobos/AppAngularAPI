import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInterface } from '../../Interfaces/login-interface';
import { UsuarioService } from '../../Service/usuario-service';
import { Utilidad } from '../../Reutilizable/utilidad';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatFormField } from "@angular/material/input";
import { SharedModule } from '../../Reutilizable/shared/shared-module';

@Component({
  selector: 'app-login',
  imports: [
    MatCard, 
    MatCardContent, 
    MatFormField,
    SharedModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formLogin: FormGroup;
  ocultarPassword: boolean = true;
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private utilidad: Utilidad
  ) {
    this.formLogin = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  iniciarSesion() {
    this.mostrarLoading = true;
    const request: LoginInterface = {
      correo: this.formLogin.value.email,
      clave: this.formLogin.value.password
    }; 

    this.usuarioService.iniciarSesion(request).subscribe({
      next: (data) => {
        if (data.status) {
          this.utilidad.guardarSesion(data.value);
          this.router.navigate(['paginas']);
        }else{
          this.utilidad.mostrarMensaje("No se pudo iniciar sesión", 'Opps!');
        }
      },
      complete: () => {
        this.mostrarLoading = false
      },
      error: (err) => {
        this.utilidad.mostrarMensaje("Error al iniciar sesión", 'Error');
        this.mostrarLoading = false;
      }
    });
  }
}
