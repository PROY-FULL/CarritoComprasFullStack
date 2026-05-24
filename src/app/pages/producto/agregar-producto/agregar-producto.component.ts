import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarritoService } from '../../../servicios/carrito.service';

@Component({
  selector: 'app-agregar-producto',
  imports: [MatToolbarModule, MatIconModule, MatDialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {

  agregarFoms: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialogRef<AgregarProductoComponent>, private carritoService: CarritoService) {
    this.agregarFoms = this.fb.group({
      IdProducto: [0],
      Nombre: ['', [Validators.required]],
      Descripcion: ['', [Validators.required]],
      Precio: ['', [Validators.required]],
      Stock: ['', [Validators.required]],
      Activo: [true],
      Ruta: ['', [Validators.required]]
    });
  }

  agregar() {
    this.carritoService.post('Productos', this.agregarFoms.value).subscribe({
      next: (res) => {
        console.log('Edicion exitosa');
        this.closeDilog();
      }, error: (err) => {
        console.log('Error')
      }
    });
  }
  closeDilog() {
    this.dialog.close();
  }

}
