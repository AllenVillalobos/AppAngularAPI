import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProducto } from '../../Modales/modal-producto/modal-producto';
import { ProductoInterface } from '../../../../Interfaces/producto-interface';
import { ProductoService } from '../../../../Service/producto-service';
import { Utilidad } from '../../../../Reutilizable/utilidad';

import Swal from 'sweetalert2';
import { MatCardModule, MatCardTitle } from "@angular/material/card";
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

import { SharedModule } from '../../../../Reutilizable/shared/shared-module';

@Component({
  selector: 'app-producto',
  imports: [MatCardModule, MatCardTitle, MatAnchor, MatIcon, SharedModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Producto implements AfterViewInit, OnInit {

  columnasTabla: string[] = ['nombre', 'categoria', 'stock', 'precio', 'estado', 'acciones'];
  dataSource: Producto[] = [];
  dataListaProductos = new MatTableDataSource(this.dataSource);
  @ViewChild(MatPaginator) paginador!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private productoService: ProductoService,
    private utilidad: Utilidad
  ) { }

  obtenerProductos() {
    this.productoService.lista().
      subscribe({
        next: (datos) => {
          if (datos.status) {
            this.dataListaProductos.data = datos.value;
          } else {
            this.utilidad.mostrarMensaje("Error al cargar los productos", "Oops!");
          }
        },
        error: (error) => {
          this.utilidad.mostrarMensaje("Error al cargar los productos", "Error");
        }
      });
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  ngAfterViewInit(): void {
    this.dataListaProductos.paginator = this.paginador;
  }

  aplicarFiltroTabla(evento: Event) {
    const filtroValor = (evento.target as HTMLInputElement).value;
    this.dataListaProductos.filter = filtroValor.trim().toLowerCase();
  }

  abrirModalGuardar() {
    this.dialog.open(ModalProducto, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerProductos();
      }
    });
  }

  abrirModalEditar(datosProducto: ProductoInterface) {
    this.dialog.open(ModalProducto, {
      disableClose: true,
      data: datosProducto
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerProductos();
      }
    });
  }

    eliminarProducto(datosProducto: ProductoInterface) {
      Swal.fire({
        title: '¿Estás seguro de eliminar el producto?',
        text: datosProducto.nombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productoService.eliminar(datosProducto.idProducto).subscribe({
            next: (respuesta) => {
              if (respuesta.status) {
                this.utilidad.mostrarMensaje("Producto eliminado correctamente", "Éxito");
                this.obtenerProductos();
              } else {
                this.utilidad.mostrarMensaje("Error al eliminar el producto", "Error");
              }
            },
            error: (error) => {
              this.utilidad.mostrarMensaje("Error al eliminar el producto", "Error");
            }
          });
        }
      });
    }
}