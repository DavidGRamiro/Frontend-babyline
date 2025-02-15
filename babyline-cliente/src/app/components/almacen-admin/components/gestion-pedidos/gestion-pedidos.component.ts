import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { GestionPedidosGridComponent } from './gestion-pedidos-grid/gestion-pedidos-grid.component';
import { PickListModule } from 'primeng/picklist';
import { ProductosService } from '../../../productos/services/productos.service';
import { PedidosService } from '../../../pedidos/services/pedidos.service';

@Component({
  selector: 'app-gestion-pedidos',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, GestionPedidosGridComponent, PickListModule],
  templateUrl: './gestion-pedidos.component.html',
  styleUrl: './gestion-pedidos.component.css',
  providers: [PickListModule],
})
export class GestionPedidosComponent implements OnInit {
  
  @Output() evenRes : EventEmitter<any> = new EventEmitter<any>();
  @Input() refresh : boolean = false;

  private _pedidoService = inject(PedidosService)

  public bDisplay : boolean = false;
  public missingCI : number = 0;
  public missingAZ : number = 0;
  public missingMIR : number = 0;
  public missingCAR : number = 0;
  public missingBAB : number = 0;

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
    this.getPedidosMissing()
  }

  addPedido() {
    this.evenRes.emit(true);
  }


  getPedidosMissing() : number {
    this._pedidoService.getPedidos().subscribe({
      next: (data: any) => {
        let pedidos = data

        let elcorteIngles = pedidos.filter((item : any) => {
          return item.tienda === "1" && item.estado === 'Sin empezar'
        })
        this.missingCI = Number(elcorteIngles.length)

        let amazon = pedidos.filter((item : any) => {
          return item.tienda === "2" && item.estado === 'Sin empezar'
        })
        this.missingAZ = Number(amazon.length)

        let miravia = pedidos.filter((item : any) => {
          return item.tienda === "3" && item.estado === 'Sin empezar'
        })
        this.missingMIR = Number(miravia.length)

        let carrefour = pedidos.filter((item : any) => {
          return item.tienda === "4" && item.estado === 'Sin empezar'
        })
        this.missingCAR = Number(carrefour.length)

        let baby = pedidos.filter((item : any) => {
          return item.tienda === "5" && item.estado === 'Sin empezar'
        })
        this.missingBAB = Number(baby.length)
        
      }
    })

    return 7
  }

}
