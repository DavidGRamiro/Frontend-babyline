import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-view-pedidos',
  standalone: true,
  imports: [
    CommonModule, PrimeNgModule
  ],
  templateUrl: './view-pedidos.component.html',
  styleUrl: './view-pedidos.component.css',
})
export class ViewPedidosComponent implements OnInit {

  // Servicios
  private _pedidoService = inject(PedidosService)

  public pedidos : any[] = []

  ngOnInit(): void {
    let id_usuario = localStorage.getItem('user')
    if (id_usuario) {
      let params : any = { id_fk_usuario : JSON.parse(id_usuario).id }
      this._pedidoService.getPedidos(params).subscribe(
        (data: any) => {
          this.pedidos = data
        }
      )
    }
  }

  constructor() { }

  refresh(){}

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

}
