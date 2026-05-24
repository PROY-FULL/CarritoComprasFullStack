import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-carrito',
  imports: [CommonModule],
  templateUrl: './detalle-carrito.component.html',
  styleUrl: './detalle-carrito.component.css'
})
export class DetalleCarritoComponent implements OnInit {

  Detalles: any = [];
  Total: number = 0;
  error: string = '';

  constructor(private carritoService: CarritoService, private router: Router) {

  }
  ngOnInit() {

    this.carritoService.get('CarritoDetalle/' + 3).subscribe(data => {
      this.Detalles = data;

      this.Total = this.Detalles[0].total;
      console.log(this.Detalles)
    }, error => {
      console.log('Hubo un erro al obtener los detalles de los productos:' + error);
    })
  }
  realizarPago() {
    var pagar = {
      IdUsuario: 3,
      IdCarrito: this.Detalles[0].idCarrito,
      Total: this.Total

    }

    this.carritoService.post('CarritoDetalle/pagar', pagar).subscribe({
      next: (resp) => {
        console.log('Exitoso', resp.mensaje);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 400) {
          console.log("error 400")
          this.error = error.error;

          setTimeout(() => {
            this.error = '';
          }, 3000);

        } else if (error.estatus === 501) {
          this.error = error.error;

          setTimeout(() => {
            this.error = '';
          }, 3000);
        }

      }
    })

  }

}
