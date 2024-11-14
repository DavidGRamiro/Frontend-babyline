import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { PedidosService } from '../../services/pedidos.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-pedidos',
  standalone: true,
  imports: [
    CommonModule, PrimeNgModule
  ],
  templateUrl: './view-pedidos.component.html',
  styleUrl: './view-pedidos.component.css',
  providers: [MessageService]
})
export class ViewPedidosComponent implements OnInit {

  // Servicios
  private _pedidoService = inject(PedidosService)
  private _msgService = inject(MessageService)

  public pedidos : any[] = []

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

  // Función que asoaciamos cuando empezamos un pedido. Mostraremos el mensaje de que el pedido ha sido iniciado,
  // Actualizaremos la base de datos con el estado del pedido, y redigiremos a una pantalla de creación de pedido
  empezarPedido(pedido : any){

    let data = {...pedido}
    data.estado = 'En curso'

    this._pedidoService.updatePedido(pedido.id, data).subscribe({
      next: (data: any) => {
        console.log(data)
        this._msgService.add({ severity: 'info', detail: 'Pedido en curso !', summary: '' })
        this.getPedidos()
        
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

}
