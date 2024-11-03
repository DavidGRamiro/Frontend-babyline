import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { GridProductosComponent } from './components/productos/components/grid-productos/grid-productos.component';
import { AlmacenAdminComponent } from './components/almacen-admin/components/almacen-admin/almacen-admin.component';
import { LoginComponent } from './components/auth/components/login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'productos', component: GridProductosComponent },
  { path: 'almacen', component: AlmacenAdminComponent },


];
