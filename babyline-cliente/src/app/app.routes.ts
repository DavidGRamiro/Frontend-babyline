import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { GridProductosComponent } from './componentes/productos/components/grid-productos/grid-productos.component';
import { AlmacenAdminComponent } from './componentes/almacen-admin/components/almacen-admin/almacen-admin.component';

export const routes: Routes = [
  { path: '', component: LayoutComponent },
  { path: 'productos', component: GridProductosComponent },
  { path: 'almacen', component: AlmacenAdminComponent },

];
