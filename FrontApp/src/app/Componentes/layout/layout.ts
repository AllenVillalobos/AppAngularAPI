import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { SharedModule } from '../../Reutilizable/shared/shared-module';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SharedModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
