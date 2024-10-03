import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss',
})
export class ProductosComponent implements OnInit {


  private _productoService = inject(ProductosService)

  constructor() {}

  ngOnInit(): void {
    this._productoService.getProductos().subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
