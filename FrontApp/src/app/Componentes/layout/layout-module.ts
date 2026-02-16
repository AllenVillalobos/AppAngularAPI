import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing-module';

import { DashBoard } from './Paginas/dash-board/dash-board';
import { Usuario } from './Paginas/usuario/usuario';
import { HistorialVenta } from './Paginas/historial-venta/historial-venta';
import { Producto } from './Paginas/producto/producto';
import { Venta } from './Paginas/venta/venta';
import { Reporte } from './Paginas/reporte/reporte';

import { SharedModule } from '../../Reutilizable/shared/shared-module';
import { Layout } from './layout';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    DashBoard,
    Usuario,
    HistorialVenta,
    Producto,
    Venta,
    Reporte,
    SharedModule,
    Layout
  ]
})
export class LayoutModule { }
