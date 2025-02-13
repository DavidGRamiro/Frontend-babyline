import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { PedidosService } from '../../services/pedidos.service';
import { MessageService } from 'primeng/api';
import { PedidoOrderComponent } from '../pedido-order/pedido-order.component';

@Component({
  selector: 'app-view-pedidos',
  standalone: true,
  imports: [
    CommonModule, PrimeNgModule, PedidoOrderComponent
  ],
  templateUrl: './view-pedidos.component.html',
  styleUrl: './view-pedidos.component.css',
  providers: [MessageService]
})
export class ViewPedidosComponent implements OnInit {

  // Servicios
  private _pedidoService = inject(PedidosService)
  private _msgService = inject(MessageService)

  public pedidos : any[] = [];
  public productosPedido : [] = [];
  public pedidoEmpezado : boolean = false;

  ngOnInit(): void {
    this.getPedidos()
  }

  constructor() { }

  // Obtenemos los pedidos del usuario logueado
  getPedidos(){
    // Obtenemos los datos del usuario del local storage
    let id_usuario = localStorage.getItem('user')
    if (id_usuario) {
      
      let params : any = { id_fk_usuario : JSON.parse(id_usuario).id }
      this._pedidoService.getPedidos(params).subscribe({
        next: (data: any) => {
          this.pedidos = data
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    }
  }

  //Mostramos la denominación de la tienda en base a los ids de tienda recibidos
  getTienda(id_tienda : string){
    let denom_tienda : string = ''
    switch (id_tienda) {
      case '1':
        denom_tienda = 'El Corte Inglés'
        break;
      case '2':
        denom_tienda = 'Amazon'
        break;
      case '3':
        denom_tienda = 'Miravia'
        break;
      case '4':
        denom_tienda = 'Carrefour'
        break;
      case '5':
        denom_tienda = 'Babyline'
    }
    return denom_tienda
  }

  // Mostramos un badge del estado del pedido dependiendo del estado del pedido
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

  // Mostramos un badge en base a la prioridad y urgencia en realizar un pedido
  getPrioridad(prioridad : string){
    switch (prioridad) {
      case 'Alta':
          return 'danger';
      case 'Media':
          return 'warning';
      case 'Baja':
          return 'info';
      default:
          return 'secondary';
    }
  }

  // Función que asoaciamos cuando empezamos un pedido
  empezarPedido(pedido : any){
    this.pedidoEmpezado = true;
    this.getDetallePedidos(pedido)
    
  }

  // Una vez seleccionado el pedido se obtienen los productos que lo contienen
  getDetallePedidos(pedido:any){
    let params = { id_fk_pedido : pedido.id}
    this._pedidoService.getDetallePedido(params).subscribe({
      next : (data:any) =>{
        this.productosPedido = data
      },
      error : (err: any) => {
        this._msgService.add({})
      }
    })
  }

  //Recibimos el emitter de gestion del pedido.
  getEmitterOrder(event : Event){
    if(event){
      this.pedidoEmpezado = false;
      this.getPedidos()
    }
  }

}
