import { Routes } from '@angular/router';
import { Login } from './Componentes/login/login';

export const routes: Routes = [
    { path: '', component: Login, pathMatch: "full" },
    { path: 'login', component: Login, pathMatch: "full" },
    { path: 'paginas', loadChildren: () => import('./Componentes/layout/layout-module').then(m => m.LayoutModule) },
    { path: '**', component: Login, pathMatch: "full" }
];
