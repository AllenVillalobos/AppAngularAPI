import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './Componentes/login/login';
import { Layout } from './Componentes/layout/layout';
import { SharedModule } from './Reutilizable/shared/shared-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    SharedModule,
    Login,
    Layout
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FrontApp');
}
