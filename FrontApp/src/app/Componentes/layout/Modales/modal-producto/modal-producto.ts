import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaInterface } from '../../../../Interfaces/categoria-interface';
import { ProductoInterface } from '../../../../Interfaces/producto-interface';

import { CategoriaService } from '../../../../Service/categoria-service';
import { ProductoService } from '../../../../Service/producto-service';
import { Utilidad } from '../../../../Reutilizable/utilidad';
import { SharedModule } from '../../../../Reutilizable/shared/shared-module';

@Component({
  selector: 'app-modal-producto',
  imports: [SharedModule],
  templateUrl: './modal-producto.html',
  styleUrl: './modal-producto.css',
})
export class ModalProducto implements OnInit {

  formularioProducto: FormGroup;
  tituloAccion: string = 'Agregar Producto';
  botinAccion: string = 'Guardar';
  listaCategorias: CategoriaInterface[] = [];

  constructor(private modalActual: MatDialogRef<ModalProducto>,
    @Inject(MAT_DIALOG_DATA) public datosProducto: ProductoInterface,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private utilidad: Utilidad
  ) {

    this.formularioProducto = this.fb.group({
      nombre: ["", Validators.required],
      idCategoria: ["", Validators.required],
      stock: ["", Validators.required],
      precio: ["", Validators.required],
      esActivo: ["1", Validators.required]
    });

    if (this.datosProducto != null) {
      this.tituloAccion = "Editar Producto";
      this.botinAccion = "Actualizar";
    }

    this.categoriaService.lista().
      subscribe({
        next: (datos) => {
          if (datos.status) {
            this.listaCategorias = datos.value;
          }
        },
        error: (error) => {
          this.utilidad.mostrarMensaje("Error al cargar los roles", "Error");
        }
      });
  }
  ngOnInit(): void {
    if (this.datosProducto != null) {
      this.formularioProducto.patchValue({
        nombre: this.datosProducto.nombre,
        idCategoria: this.datosProducto.idCategoria,
        stock: this.datosProducto.stock,
        precio: this.datosProducto.precio,
        esActivo: this.datosProducto.esActivo.toString()
      });
    }
  }
  guardarEditar_Producto() {
    const producto: ProductoInterface = {
      idProducto: this.datosProducto != null ? this.datosProducto.idProducto : 0,
      nombre: this.formularioProducto.value.nombre,
      idCategoria: this.formularioProducto.value.idCategoria,
      descripcionCategoria: "",
      precio: this.formularioProducto.value.precio,
      stock: this.formularioProducto.value.stock,
      esActivo: parseInt(this.formularioProducto.value.esActivo)
    }

    if (this.datosProducto == null) {
      this.productoService.guardar(producto).
        subscribe({
          next: (response) => {
            if (response.status) {
              this.utilidad.mostrarMensaje("Producto guardado con éxito", "Éxito");
              this.modalActual.close("true");
            } else {
              this.utilidad.mostrarMensaje("No se pudo guardar el producto", "Error");
            }
          },
          error: (error) => {
            this.utilidad.mostrarMensaje("Error al guardar el producto", "Error");
          }
        });
    } else {
      this.productoService.editar(producto).
        subscribe({
          next: (response) => {
            if (response.status) {
              this.utilidad.mostrarMensaje("Producto actualizado con éxito", "Éxito");
              this.modalActual.close("true");
            } else {
              this.utilidad.mostrarMensaje("No se pudo actualizar el producto", "Error");
            }
          },
          error: (error) => {
            this.utilidad.mostrarMensaje("Error al actualizar el producto: " + error.message, "Error");
          }
        });
    }
  }
}

