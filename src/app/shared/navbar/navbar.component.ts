import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CarritoService } from '../../servicios/carrito.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  titulo: string = 'Carrito de Compras';
  totalCarrito: number = 0;

  constructor(public carritoService: CarritoService, private authService: AuthService) {

  }

  ngOnInit() {
    this.totalCarrito = this.carritoService.mostrarProducto();
  }

  total() {
    return this.carritoService.mostrarProducto();
  }

  salir() {
    this.authService.salir();
  }
}
