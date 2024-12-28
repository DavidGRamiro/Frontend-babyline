import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { ErrorLogComponent } from '../error-log/error-log.component';
import { GestionPedidosComponent } from '../gestion-pedidos/gestion-pedidos.component';
import { MovimientosComponent } from '../movimientos/movimientos.component';
import { SyncComponent } from '../sync/sync.component';
import { UsersComponent } from '../users/users.component';
import { MessageService } from 'primeng/api';
import { PickListModule } from 'primeng/picklist';
import { ProductosService } from '../../../productos/services/productos.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PedidosService } from '../../../pedidos/services/pedidos.service';

@Component({
  selector: 'app-almacen-admin',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNgModule,
    ErrorLogComponent,
    GestionPedidosComponent,
    MovimientosComponent,
    SyncComponent,
    PickListModule,
    UsersComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './almacen-admin.component.html',
  styleUrl: './almacen-admin.component.css',
  providers: [MessageService],
})
export class AlmacenAdminComponent implements OnInit {

  @ViewChild('codPedidoInput') codPedidoComponent! : ElementRef
  
  // Servicios
  private _productoService = inject(ProductosService)
  private _pedidoService = inject(PedidosService)
  private _msgService = inject(MessageService)

  // Variables control de estado
  public showMov: boolean = false;
  public showGestion: boolean = false;
  public showControl: boolean = false;
  public showLogError: boolean = false;
  public showSync: boolean = false;
  public bDisplay: boolean = false;
  public showAddpedido : boolean = false;
  public botonDisabled:boolean = true;
  public bDisplayTable : boolean = false;

  public sCodPedido : string = ''


  // Variables de control de datos
  public productos : any[] = []
  public productosOrder : any[] = []


  // Manejo del titulo del modal dependiendo que componente abra.
  public titleForm: string = '';


  // Formulario
  public formPedidos = new FormGroup({
    cod_pedido: new FormControl('',Validators.required),
    tienda: new FormControl('', Validators.required),
    prioridad: new FormControl('', Validators.required),
    selectedProducts: new FormControl([], Validators.required)
  });



  // Datos para rellenar el formulario de alta de un nuevo pedido
  public tiendas : any[] = [
    {name: 'El Corte Inglés', code: '1'},
    {name: 'Amazon', code: '2'},
    {name: 'Miravia', code: '3'},
    {name: 'Carrefour', code: '4'},
    {name: 'Babyline', code: '5'},
  ];

  // Datos para rellenar el formulario de alta de un nuevo pedido
  public prioridades : any[] = [
    {name: 'Alta', code: '1'},
    {name: 'Media', code: '2'},
    {name: 'Baja', code: '3'},
  ]

  ngOnInit(): void { this.getProductos(); }

  // Abre el componente de movimientos
  showMovimientos() {
    this.bDisplay = true;
    this.showMov = true;
    this.titleForm = 'Movimientos';
  }

  // Abre el componente de gestión de usuarios
  showGestionUsers() {
    this.showGestion = true;
    this.titleForm = 'Gestión de usuarios';
  }

  // Abre el componente de control de pedidos
  showControlPedidos() {
    this.bDisplay = true;
    this.showControl = true;
    this.titleForm = 'Control de pedidos';
  }

  // Abre el componente de visualización de errores
  showErrors() {
    this.bDisplay = true;
    this.showLogError = true;
    this.titleForm = 'Visalización de errores';
  }

  // Abre el componente de sincronización de la base de datos
  syncBBDD() {
    this.bDisplay = true;
    this.showSync = true;
    this.titleForm = 'Sincronización de la base de datos';
  }

  // Cierra todos los componentes
  closeAll() {
    this.bDisplay = false;
    this.showMov = false;
    this.showGestion = false;
    this.showControl = false;
    this.showLogError = false;
    this.showSync = false;
  }

  // Recoge el evento del componente de movimientos
  getEmitterUser(event: any) {
    this.closeAll();
  }

  // Recoge el evento del componente de gestión de pedidos
  getEmitterGestion(event: any) {
    this.showAddpedido = event;
  }

  // Cargamos los datos para el formulario de gestion de pedidos. Lo filtramos por aquellos que haya stock
  getProductos(){

    let params = { stock__gt: 0}

    this._productoService.obtenerProductos(params).subscribe({
      next: (productos : any) => {
        this.productos = productos
        this.productos.map((item:any) => {
          item.cantidad = 1;
          return item
        } )
      },
      error: (error) => { 
        console.log(error)
      }
    })
  }

  // Funcion para renderizar los items buscados en el selector
  trackById(index: number, item: any): number {
    return item.id;
  }
  
  // Cuando se selecciona una tienda del selector, creamos un numero de pedido aleatorio
  onTiendaClick(event:any){
    if(event.value){      
      switch(event.value.name){

        case 'Miravia':
          this.sCodPedido = 'MIR-'
          break;
        case 'Carrefour':
          this.sCodPedido = 'CRF-'
          break;
        case 'Amazon':
          this.sCodPedido = 'AMZ-'
          break;
        case 'Babyline':
          this.sCodPedido = ' BAB-'
          break;
        case 'El Corte Inglés':
          this.sCodPedido = ' ECI-'
          break;
      }

      this.sCodPedido += Math.floor(Math.random() * 10000).toString()
    }
  }

  // Asociado a botón eliminar en la tabla de gestion de pedidos
  eliminarFila(product:any){
    this.productosOrder.splice(product, 1)
    if(this.productosOrder.length == 0){
      this.bDisplayTable = false;
    }
  }

  // Cambio en la selección del item en el select box al elegir un artículo
  onChangeSelector(event:any){
    this.bDisplayTable = true;
    this.productosOrder = event.value
    if(event.value.length === 0)
      this.bDisplayTable = false;
  }

  // Método submit para guardar un pedido y mandamos al componente hijo para que haga su logica.
  savePedido(){

    //Vaidación de que un pedido tiene codigo
    if(this.sCodPedido.length == 0){
      this._msgService.add({ severity: 'warn', summary: 'Atención', detail: 'Debe de asignar una tienda para continuar con el alta del pedido.'})
      return;
    }
    //Validación de que un pedido tiene marcada una prioidad
    if(this.formPedidos.value.prioridad?.length === 0){
      this._msgService.add({ severity: 'warn', summary: 'Atención', detail: 'Por favor, asigne la prioridad del pedido.'})
      return;
    }

    //Asignamos campos que no se han podido recoger en el formulario
    this.formPedidos.value.cod_pedido = this.sCodPedido

    this._pedidoService.createPedido(this.formPedidos.value).subscribe({
      next : (data: any) => {
        this._msgService.add({ severity: 'success', detail: 'Creado !', summary: 'El pedido ha sido creado con éxito'})
        this.showAddpedido = false
        

      },
      error: (err:any) => {
        console.log(err)
        this._msgService.add({ severity: 'error', detail: err.error, summary: 'Error al crear el pedido'})


      }
    })
    

  }
}


