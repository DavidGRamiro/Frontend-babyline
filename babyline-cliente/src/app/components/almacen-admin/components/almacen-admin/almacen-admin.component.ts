import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
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
  
  // Servicios
  private _productoService = inject(ProductosService)

  // Variables control de estado
  public showMov: boolean = false;
  public showGestion: boolean = false;
  public showControl: boolean = false;
  public showLogError: boolean = false;
  public showSync: boolean = false;
  public bDisplay: boolean = false;
  public showAddpedido : boolean = false;

  // Variables de control de datos
  public productos : any[] = []
  public targetProductos : any[] = []

  // Manejo del titulo del modal dependiendo que componente abra.
  public titleForm: string = '';


  // Formulario
  public formPedidos = new FormGroup({
    cod_pedido: new FormControl('', Validators.required),
    tienda: new FormControl('', Validators.required),
    prioridad: new FormControl('', Validators.required),
  });



  // Datos para rellenar el formulario de alta de un nuevo pedido
  public tiendas : any[] = [
    {name: 'Miravia', code: '1'},
    {name: 'Amazon', code: '2'},
    {name: 'Carrefour', code: '3'},
    {name: 'Babyline', code: '4'},
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

  // Cargamos los datos para el formulario de gestion de pedidos.
  getProductos(){
    this._productoService.obtenerProductos().subscribe({
      next: (productos : any) => {
        this.productos = productos;
      },
      error: (error) => { }
    })
  }

  // Método submit para guardar un pedido y mandamos al componente hijo para que haga su logica.
  savePedido(){
    console.log(' Hola')
    console.log(this.targetProductos)
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
