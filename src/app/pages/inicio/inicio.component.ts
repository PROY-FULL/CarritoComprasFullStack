import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  Productos: any = [];
  Detalles: any = [];
  /*{
    IdProducto: 1,
    Descripcion: 'Mini camara espia wifi Inalambrica Full HD',
    RutaImg: 'img/catalogo/1.jpg',
    Precio: 300.99
  },
  {
    IdProducto: 2,
    Descripcion: 'Mini camara espia wifi Inalambrica Full HD',
    RutaImg: 'img/catalogo/2.jpg',
    Precio: 400
  },
  {
    IdProducto: 3,
    Descripcion: 'Mini camara espia wifi Inalambrica Full HD',
    RutaImg: 'img/catalogo/3.jpg',
    Precio: 400
  },
  {
    IdProducto: 4,
    Descripcion: 'Mini camara espia wifi Inalambrica Full HD',
    RutaImg: 'img/catalogo/1.jpg',
    Precio: 400
  },
  {
    IdProducto: 5,
    Descripcion: 'Mini camara espia wifi Inalambrica Full HD',
    RutaImg: 'img/catalogo/2.jpg',
    Precio: 400
  }, {
    IdProducto: 6,
    Descripcion: 'Mini camara espia wifi Inalambrica Full HD',
    RutaImg: 'img/catalogo/3.jpg',
    Precio: 400.99
  }*/


  constructor(private carritoService: CarritoService) {

  }

  ngOnInit(): void {

    this.cargarProductos();

    this.cargarCarritoDetalle();

  }

  cargarProductos() {
    this.carritoService.get('Productos/productos').subscribe(data => {
      this.Productos = data;
    }, error => {
      console.log("Hubo un error al obtener la lista de productos: " + error);
    });
  }

  cargarCarritoDetalle() {
    this.carritoService.get('CarritoDetalle/' + 3).subscribe(data => {
      this.Detalles = data;
      console.log(this.Detalles)
      this.cargarDetallesProductos();
    }, error => {
      console.log("Error al cargar los detalles del carrito:" + error);
    });
  }

  cargarDetallesProductos() {
    console.log(this.Detalles)
    if (this.Detalles != null) {
      this.Detalles.forEach((item: any) => {
        this.agregarCarrito(item.Productos);
      });
    }
  }

  agregarCarrito(producto: any) {
    this.carritoService.agregarProducto(producto);
  }

  agregar(producto: any) {

    var detalle = {
      idUsuario: 3,
      idProducto: producto.idProducto,
      cantidad: 1,
      precioUnitario: producto.precio
    };

    this.carritoService.post('CarritoDetalle', detalle).subscribe({
      next: (resp) => {
        console.log('Existoso' + resp)
        this.cargarCarritoDetalle();
      }, error: (error) => {
        console.log(error.error);
      }
    })
    //this.carritoService.agregarProducto(producto);

  }

}
