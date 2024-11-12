import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { GridProductosComponent } from './components/productos/components/grid-productos/grid-productos.component';
import { AlmacenAdminComponent } from './components/almacen-admin/components/almacen-admin/almacen-admin.component';
import { LoginComponent } from './components/auth/components/login/login.component';
import { authGuard } from './components/auth/guards/auth.guard';
import { ViewPedidosComponent } from './components/pedidos/components/view-pedidos/view-pedidos.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: LayoutComponent, children: [
    { path: 'productos', component: GridProductosComponent },
    { path: 'almacen', component: AlmacenAdminComponent },
    { path: 'pedidos', component: ViewPedidosComponent },
    ], canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }

];
