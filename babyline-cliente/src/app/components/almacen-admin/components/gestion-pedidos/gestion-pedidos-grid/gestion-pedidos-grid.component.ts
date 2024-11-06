import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../../utils/primeNG/primeNg.module';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-gestion-pedidos-grid',
  standalone: true,
  imports: [
    CommonModule, PrimeNgModule
  ],
  templateUrl: './gestion-pedidos-grid.component.html',
  styleUrl: './gestion-pedidos-grid.component.css',
})
export class GestionPedidosGridComponent implements OnInit {

  ngOnInit(): void { }

  public cols! : Column[]
  products!: any[];

  constructor() {
    this.cols = [
      { field: 'numero_pedido', header: 'Nº de pedido' },
      { field: 'numero_items', header: 'Nº de productos' },
      { field: 'fc_recepcion', header: 'Fecha' },
      { field: 'estado', header: 'Estado' }

    ];

    this.products = [
      { numero_pedido: 1, numero_items: 34, fc_recepcion:'12/02/2024', estado: 'Sin asignar' },
      { numero_pedido: 2, numero_items: 83, fc_recepcion:'13/02/2024', estado: 'Sin asignar' },
      { numero_pedido: 3, numero_items: 4, fc_recepcion:'13/02/2024', estado: 'Sin asignar' },
      { numero_pedido: 4, numero_items: 564, fc_recepcion:'12/02/2024', estado: 'Sin asignar' },
      { numero_pedido: 5, numero_items: 3, fc_recepcion:'2/02/2024', estado: 'Sin asignar' },
      { numero_pedido: 6, numero_items: 27, fc_recepcion:'12/02/2024', estado: 'Sin asignar' },

    ];
  }



}
