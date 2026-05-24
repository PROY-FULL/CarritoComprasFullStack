import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { DetalleCarritoComponent } from './pages/detalle-carrito/detalle-carrito.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [authGuard]
  },
  {
    path: 'contacto',
    component: ContactoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'producto',
    component: ProductoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'detalle-carrito',
    component: DetalleCarritoComponent,
    canActivate: [authGuard]
  },
  {
    path: '', redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/login'
  }

];
