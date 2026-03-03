import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { ProductoService } from '../../../../Service/producto-service';
import { VentaService } from '../../../../Service/venta-service';
import { Utilidad } from '../../../../Reutilizable/utilidad';

import { ProductoInterface } from '../../../../Interfaces/producto-interface';
import { VentaInterface } from '../../../../Interfaces/venta-interface';
import { DetalleVentaInterface } from '../../../../Interfaces/detalle-venta-interface';

import { ChangeDetectorRef } from '@angular/core';

import Swal from 'sweetalert2';

import { SharedModule } from "../../../../Reutilizable/shared/shared-module";
@Component({
  selector: 'app-venta',
  imports: [SharedModule],
  templateUrl: './venta.html',
  styleUrl: './venta.css',
})
export class Venta {


  listaProductos: ProductoInterface[] = [];
  listaProductosFiltro: ProductoInterface[] = [];

  listaProductoParaVenta: DetalleVentaInterface[] = [];
  bloquearBotonRegistrar: boolean = false;

  productoSeleccionado!: ProductoInterface;
  tipoPagoPOrDefecto: string = "Efectivo";
  totalPagar: number = 0;

  formularioProductoVenta: FormGroup;
  columnasTabla: string[] = ['producto', 'cantidad', 'precio', 'total', 'accion'];
  datosDetalleVenta = new MatTableDataSource(this.listaProductoParaVenta);

  retornarProductoPorFiltro(busqueda: any): ProductoInterface[] {
    const valorBuscado = typeof busqueda === "string" ? busqueda.toLowerCase() : busqueda.nombre.toLocaleLowerCase();

    return this.listaProductos.filter(item => item.nombre.toLocaleLowerCase().includes(valorBuscado))
  }

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private ventaService: VentaService,
    private utilidad: Utilidad,
    private cdr: ChangeDetectorRef
  ) {
    this.formularioProductoVenta = this.fb.group({
      producto: ["", Validators.required],
      cantidad: ["", Validators.required],
    });

    this.productoService.lista().
      subscribe({
        next: (datos) => {
          if (datos.status) {
            const lista = datos.value as ProductoInterface[];
            this.listaProductos = lista.filter(p => p.esActivo == 1 && p.stock > 0);
          }
        },
        error: (error) => {
          this.utilidad.mostrarMensaje("Error al cargar los roles", "Error");
        }
      });

    this.formularioProductoVenta.get('producto')?.valueChanges.subscribe(value => {
      this.listaProductosFiltro = this.retornarProductoPorFiltro(value);
    });
  }

  mostrarProducto(producto: ProductoInterface): string {
    return producto.nombre;
  }

  productoParaVenta(event: any) {
    this.productoSeleccionado = event.option.value;
  }

  agregarProductoParaVenta() {
    const cantidad: number = this.formularioProductoVenta.value.cantidad;
    const precio: number = parseFloat(this.productoSeleccionado.precio);
    const total: number = cantidad * precio;

    this.totalPagar = this.totalPagar + total;

    this.listaProductoParaVenta.push({
      idProducto: this.productoSeleccionado.idProducto,
      descripcionProducto: this.productoSeleccionado.nombre,
      cantidad: cantidad,
      precioTexto: String(precio),
      totalTexto: String(total)
    });

    this.datosDetalleVenta = new MatTableDataSource(this.listaProductoParaVenta);

    this.formularioProductoVenta.patchValue({
      producto: "",
      cantidad: ""
    });
  }

  eliminarProducto(detalle: DetalleVentaInterface) {
    this.totalPagar = this.totalPagar - parseFloat(detalle.totalTexto);
    this.listaProductoParaVenta = this.listaProductoParaVenta.filter(p => p.idProducto != detalle.idProducto);

    this.datosDetalleVenta = new MatTableDataSource(this.listaProductoParaVenta);
  }

  registrarVenta() {
    if (this.listaProductoParaVenta.length > 0) {
      this.bloquearBotonRegistrar = true;

      const request: VentaInterface = {
        tipoPago: this.tipoPagoPOrDefecto,
        totalTexto: String(this.totalPagar),
        detalleVenta: this.listaProductoParaVenta
      }

      this.ventaService.registrar(request).subscribe({
        next: (response) => {
          if (response.status) {
            const numero = (response.value as any)?.numeroDocumento ?? '(sin número)';
            Swal.fire({
              icon: 'success',
              title: "Venta Registrada Con Exito!",
              text: `Numero de Venta ${numero}`
            });
            this.totalPagar = 0.00;
            this.listaProductoParaVenta = [];
            this.datosDetalleVenta = new MatTableDataSource(this.listaProductoParaVenta);
            this.cdr.detectChanges();
          } else {
            this.utilidad.mostrarMensaje("No se pudo registrar la venta", "Oopps");
          }
        },
        error: (e) => {
          this.bloquearBotonRegistrar = false;
          this.cdr.detectChanges();
          this.utilidad.mostrarMensaje("Error al realizar la accion", "Error")
        }
      })
    }
  }
}
