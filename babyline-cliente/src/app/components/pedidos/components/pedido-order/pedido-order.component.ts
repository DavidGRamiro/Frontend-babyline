import { Component, inject, input, Input, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../productos/services/productos.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PedidosService } from '../../services/pedidos.service';
import { FormsModule } from '@angular/forms';
import { GestionPedidosGridComponent } from '../../../almacen-admin/components/gestion-pedidos/gestion-pedidos-grid/gestion-pedidos-grid.component';
import { producerIncrementEpoch } from '@angular/core/primitives/signals';

interface Producto {
  cantidad : number,
  id : number,
  id_fk_categoria : number,
  id_fk_pedido : number,
  id_fk_producto : number,
  producto : {
    id: number,
    stock: number
  }
}

@Component({
  selector: 'app-pedido-order',
  standalone: true,
  imports: [CommonModule,PrimeNgModule, FormsModule],
  templateUrl: './pedido-order.component.html',
  styleUrl: './pedido-order.component.css',
  providers: [MessageService, ConfirmationService]
})
export class PedidoOrderComponent implements OnInit {

  @Input() set order (data : any[]){
    if(data.length > 0){
      this.productos = data
    }
  }

  private _msgService = inject(MessageService)
  private _confirm = inject(ConfirmationService)
  private _pedidoService = inject(PedidosService)
  private _productoService = inject(ProductosService)

  public productos : Producto[] = [];
  public showCheck : boolean = false;
  public addedProducts: {[key: number | string] : boolean} = {};
  public listOrder : any[] = []
  public productoError : any[] = [];
  public finishOrder : boolean = false
  public inputValue  = null;
  public missingProducts : any[] = [];


  ngOnInit(): void {}

  formatData(data : any[]){
    // Recorremos todo el array que nos llega para recuperar solo los productos
    data.forEach((item) => {
      this.productos.push(item.producto)
    })
  }

  // Se informa de un error de un producto faltante en el pedido
  errorOrder(item:any){
    if (!this.productoError.includes(item.id_fk_producto)) {
      this.productoError.push(item.id_fk_producto);
    }
    this._msgService.add({ severity: 'info', life: 3500, summary: 'Incidencia enviada', detail: 'Se ha informado al administrador sobre el estado del producto.' })

  }

  // Añadimos a un array de objetos los items que han sido añadidos al pedido
  addProductOrder(producto: Producto){
    this.productos.map(( item : Producto ) =>  {
      if(item.id_fk_producto === producto.producto.id){
        this.addedProducts[item.id_fk_producto] = true
      }
    })

    if(this.inputValue === null){
      this.listOrder.push({
        producto: producto.id_fk_producto,
        cantidad: producto.cantidad
      })
    }else{
      this.listOrder.push({
        producto: producto.id_fk_producto,
        cantidad: this.inputValue
      })
    }
  }

  procesarPedido(){
    const allAdded = this.productos.every(producto => this.addedProducts[producto.id_fk_producto]);
    const hasErrors = this.productoError.length > 0;
    const notEnought = this.productos.filter(( producto) => {
      if(producto.cantidad > producto.producto.stock) {
        this.missingProducts.push({
          id_producto: producto.producto.id,
          cantidad: producto.cantidad - producto.producto.stock
        })
      }
      return producto.cantidad > producto.producto.stock
    })

    if(notEnought && this.productoError.length == 0){
      this._msgService.add({
        severity: 'error', summary: 'Registre la incidencia', detail:'Para terminar de procesar el pedido, es necesario que notifique el porducto incompleto.', life:3000
      })
      return
    }

    if (allAdded && notEnought.length == 0) {
      this.finishOrder = true
      this._msgService.add({ severity: 'info', detail:'', summary:'Pedido finalizado'})
    } else if (hasErrors || notEnought.length > 0) {
      this._confirm.confirm({
        message: 'Existen productos que no se añadido al pedido.' +
        '¿Deseas continuar?',
        header: 'Pedido finalizado.',
        icon: 'pi pi-info-circle',
        acceptIcon:"check",
        rejectIcon:"times",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          this.finish()
        },
        reject: () => {
        },
        key: 'positionDialog'
      });
    } else {
      this._msgService.add({ severity: 'error', sticky:true, summary: 'Pedido no completado', detail: 'No se han añadido todos los productos al pedido. Si no hay stock en alguno de los productos, por favor, pulsa el botón de la incidencia.'})
    }
  }

  finish(){
    // Se recorre toda la lista de los items que se han podido añadir al pedido.
    this.listOrder.forEach(element => {
      this._productoService.editarProductoPartial(element.producto, element).subscribe({
        next :(data: any) => {
          console.log('editado')
        },
        error : (err: any) => {
        }
      })
    });

    // Actualiamos el estado del pedido.
    const id_pedido = this.productos[0].id_fk_pedido
    let data = {
      id: id_pedido,
      estado: 'Finalizado'
    }
    // EN el caso de que existan productos del pedido, que no han podido ser procesados, los mandamos en la actualizacion del pedido.
    let faltantes = { faltantes: this.missingProducts }
    this.missingProducts ? Object.assign(data, faltantes) : null

    // Actualizacion del pedido.
    this._pedidoService.updatePedido(id_pedido, data).subscribe({
      next: (data:any)=>{
        console.log(data)
      },
      error : (err: any)=>{
        console.log(err)
      }
    })



  }

}


