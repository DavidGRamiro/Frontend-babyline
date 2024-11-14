import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { GestionPedidosGridComponent } from './gestion-pedidos-grid/gestion-pedidos-grid.component';
import { PickListModule } from 'primeng/picklist';
import { ProductosService } from '../../../productos/services/productos.service';

@Component({
  selector: 'app-gestion-pedidos',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, GestionPedidosGridComponent, PickListModule],
  templateUrl: './gestion-pedidos.component.html',
  styleUrl: './gestion-pedidos.component.css',
  providers: [PickListModule],
})
export class GestionPedidosComponent implements OnInit {
  
  private _productoService = inject(ProductosService)


  public bDisplay : boolean = false;
  public productos : any[] = []
  public targetProductos : any[] = []

  public tiendas : any[] = [
    {name: 'Miravia', code: '1'},
    {name: 'Amazon', code: '2'},
    {name: 'Carrefour', code: '3'},
    {name: 'Babyline', code: '4'},
  ];

  public prioridades : any[] = [
    {name: 'Alta', code: '1'},
    {name: 'Media', code: '2'},
    {name: 'Baja', code: '3'},
  ]
  
  ngOnInit(): void {
    this.getProductos();
  }

  addPedido() {
    this.bDisplay = true;
  }

  getProductos(){
    this._productoService.obtenerProductos().subscribe({
      next: (productos : any) => {
        this.productos = productos;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
