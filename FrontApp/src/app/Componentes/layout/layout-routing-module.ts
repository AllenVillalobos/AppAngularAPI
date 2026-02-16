import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout';
import { DashBoard } from './Paginas/dash-board/dash-board';
import { Usuario } from './Paginas/usuario/usuario';
import { Producto } from './Paginas/producto/producto';
import { Venta } from './Paginas/venta/venta';
import { HistorialVenta } from './Paginas/historial-venta/historial-venta';
import { Reporte } from './Paginas/reporte/reporte';

const routes: Routes = [{
  path: '',
  component: Layout,
  children: [
    { path: 'dashboard', component: DashBoard },
    { path: 'usuarios', component: Usuario },
    { path: 'productos', component: Producto },
    { path: 'ventas', component: Venta },
    { path: 'historialVentas', component: HistorialVenta },
    { path: 'reportes', component: Reporte }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
