import { Component, inject, Input, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../productos/services/productos.service';

@Component({
  selector: 'app-pedido-order',
  standalone: true,
  imports: [CommonModule,PrimeNgModule],
  templateUrl: './pedido-order.component.html',
  styleUrl: './pedido-order.component.css',
})
export class PedidoOrderComponent implements OnInit {

  @Input() set order (data : any[]){
    if(data.length > 0){
      this.productos = data
    }
  }

  public productos : any[] = []

  ngOnInit(): void {}

  formatData(data : any[]){
    // Recorremos todo el array que nos llega para recuperar solo los productos
    data.forEach((item) => {
      this.productos.push(item.producto)
    })

    console.log('prodcutos',this.productos)


  }

}


