import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridProductosComponent } from './componentes/productos/componentes/grid-productos/grid-productos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GridProductosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'babyline-cliente';

}
