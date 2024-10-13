import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { GridProductosComponent } from './componentes/productos/componentes/grid-productos/grid-productos.component';

export const routes: Routes = [
  { path: '', component: LayoutComponent },
  { path: 'productos', component: GridProductosComponent }
];
