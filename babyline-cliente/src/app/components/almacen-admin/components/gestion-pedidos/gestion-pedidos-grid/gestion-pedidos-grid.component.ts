import { CommonModule } from '@angular/common';
import { Component, inject, Input, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../../utils/primeNG/primeNg.module';
import { SocketService } from '../../../../auth/services/socket.service';
import { ProductosService } from '../../../../productos/services/procuctos.service';
import { FormsModule } from '@angular/forms';
import { PedidosService } from '../../../../pedidos/services/pedidos.service';
import { error } from 'console';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-gestion-pedidos-grid',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, FormsModule],
  templateUrl: './gestion-pedidos-grid.component.html',
  styleUrl: './gestion-pedidos-grid.component.css',
})
export class GestionPedidosGridComponent implements OnInit {

  @Input() tienda : string = '';

  private _pedidoService = inject(PedidosService);
  private webSocketService = inject(SocketService);

  public cols!: Column[];
  products!: any[];

  ngOnInit(): void {
    this.getPedidos()
  }

  constructor() {
    this.cols = [
      { field: 'numero_pedido', header: 'Nº de pedido' },
      { field: 'items', header: 'Nº de productos' },
      { field: 'fc_pedido', header: 'Fecha' },
    ];
  }

  getPedidos() {

    let params = { tienda : this.tienda }
    this._pedidoService.getPedidos(params).subscribe(
      (data: any) => {
        this.products = data
      },
      error => {
        console.error(error)
      }
    )
  }

  getEstado(estado : string){
    switch (estado) {
      case 'En curso':
          return 'info';
      case 'Finalizado':
          return 'success';
      case 'Sin empezar':
          return 'secondary';
      default:
          return 'secondary';
    }
  }

  asignarPedido(pedido: any) {
    console.log(pedido)
  }



}
