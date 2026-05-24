import { IProducto } from './../../../models/Productos';
import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CarritoService } from '../../../servicios/carrito.service';

@Component({
  selector: 'app-editar-producto',
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, MatDialogModule, ReactiveFormsModule, FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit {

  editarForms: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder, private dialog: MatDialogRef<EditarProductoComponent>,
    private carritoService: CarritoService) {
    this.editarForms = this.fb.group({
      IdProducto: [0],
      Nombre: [''],
      Descripcion: [''],
      Precio: [''],
      Stock: [''],
      Activo: [false],
      Ruta: [''],
    });
  }
  ngOnInit(): void {
    console.log(this.data);

    if (this.data !== null) { }
    const datosNuevos = {
      IdProducto: this.data.producto.idProducto,
      Nombre: this.data.producto.nombre,
      Descripcion: this.data.producto.descripcion,
      Precio: this.data.producto.precio,
      Stock: this.data.producto.stock,
      Ruta: this.data.producto.ruta,
      Activo: this.data.producto.activo
    }
    this.editarForms.patchValue(datosNuevos);
  }

  Editar() {
    this.carritoService.put('Productos', this.editarForms.value).subscribe({
      next: (res) => {
        console.log('Edicion exitosa');
        this.closeDiolog();
      }, error: (err) => {
        console.log('Error')
      }
    });
  }


  closeDiolog() {
    this.dialog.close();
  }

}
