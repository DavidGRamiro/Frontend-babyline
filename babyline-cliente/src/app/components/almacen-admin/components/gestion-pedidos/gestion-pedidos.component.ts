import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, type OnInit } from '@angular/core';
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
  
  @Output() evenRes : EventEmitter<any> = new EventEmitter<any>();
  @Input() refresh : boolean = false;
  
  public bDisplay : boolean = false;

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
  }

  addPedido() {
    this.evenRes.emit(true);
  }

}
