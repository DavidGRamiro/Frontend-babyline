import { CommonModule } from '@angular/common';
import { Component, inject, Input, type OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/procuctos.service';
import { oRespuestaAPI } from '../../../../utils/clases/response';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { FormsModule, ɵFormControlCtor } from '@angular/forms';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormProductosComponent } from '../form-productos/form-productos.component';
import { eAccionHTTP } from '../../../../utils/clases/enums';


@Component({
  selector: 'app-grid-productos',
  standalone: true,
  imports: [
    CommonModule, PrimeNgModule, FormsModule, FormProductosComponent
  ],
  templateUrl: './grid-productos.component.html',
  styleUrl: './grid-productos.component.css',
  providers: [MessageService, ConfirmationService]
})
export class GridProductosComponent implements OnInit {

  // Servicio de productos
  private _proService = inject(ProductosService);
  private _messageService = inject(MessageService);
  private _confirmationService = inject(ConfirmationService);

  // Tabla de productos
  public productos : any[] = [];
  public searchValue: string = '';
  public productoSeleccionado: any;

  // Items del menu desplegable superior de la tabla
  public items: any[] = [];
  public eAccion : eAccionHTTP = eAccionHTTP.POST;

  // Modal de alta y de edicion
  public bDisplay : boolean = false;
  public titleForm : string = 'Nuevo producto';

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarItems()
  }

  // Cargamos todos los productos dispobibles
  cargarProductos(){
    // TODO: Imlementar filtros por defecto y cargar los especificos seleccionados en el selector página.
    let oResultadoAPI : oRespuestaAPI = new oRespuestaAPI();
    this._proService.obtenerProductos().subscribe({
      next: (data : any) => {
        this.productos = data;
      },
      error: (error) => { }
    })
  }

  // Carga de items en el menu desplegable superior de la tabla
  cargarItems(){
    this.items = [
      { 
        icon: 'pi pi-plus',
        command: () => { this.altaProducto(); }
      },
      {
        icon: 'pi pi-pencil',
        command: () => { this.editProducto(); }
      },
      {
        icon: 'pi pi-trash',
        command: () => { this.confirm(); }
      },
      {
        icon: 'pi pi-upload',
        command: () => { this.cargaMasiva(); }
      },
    ];
  }

  // Funcion para obtener el estado del producto
  getStockStatus(stock: number) {
    
    if(stock === 0){
      return 'secondary';
    }else if(stock > 0 && stock <= 5){
      return;
    }else if(stock > 5 && stock <= 10){
      return 'info';
    }else{
      return 'success';
    }
  
  }

  getDisplayStock(stock: number) {
    if(stock === 0){
      return 'Sin stock';
    }else if(stock > 0 && stock <= 5){
      return 'Últimas unidades';
    }else if(stock > 5 && stock <= 10){
      return 'Stock bajo';
    }else{
      return 'Stock disponible';
    }
  }

  // Funcion asociado al buscador superior de la tabla
  buscar(table : Table){
    table.filterGlobal(this.searchValue, 'contains')
  }

  // Alta de nuevo producto
  altaProducto(){
    this.bDisplay = true;
    this.eAccion = eAccionHTTP.POST;
  }

  // Edicion de producto
  editProducto(){
    if(!this.productoSeleccionado){
      this._messageService.add({severity:'warn', summary: 'Atención', detail: 'Selecciona un producto para editar.'});
      return;
    }
    this.bDisplay = true;
    this.titleForm = 'Editar producto';
    this.eAccion = eAccionHTTP.PUT;
  }

  // Modal de confirmacion de borrado
  confirm() {
    
    if(!this.productoSeleccionado){
      this._messageService.add({severity:'warn', summary: 'Atención', detail: 'Selecciona un producto para eliminar.'});
      return;
    }

    this._confirmationService.confirm({
        
        message: `¿Estás seguro de que quieres eliminar ${this.productoSeleccionado.denominacion_producto} ?`,
        header: 'Eliminar producto',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        acceptButtonStyleClass:"p-button-text-success",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          this.deleteProducto();
        },
        reject: () => {
          return
        }
    });
  }

   // Borrado de prodcuto
  deleteProducto(){
    this._proService.eliminarProducto(this.productoSeleccionado.id).subscribe({
      next: (data : any) => {
        this._messageService.add({severity:'success', summary: 'Éxito', detail: 'Producto eliminado correctamente.'});
        this.cargarProductos();
      },
      error: (error) => {
        this._messageService.add({severity:'error', summary: 'Error', detail: 'Error al eliminar el producto.'});
      }
    });

  }

  // Alta de masiva de productos sobre la base de datos desde CSV
  cargaMasiva(){}

  // Emitter del formulario para cerrar el modal.
  getEmitterForm(event: any){
    this.cargarProductos();
    this.bDisplay = event;
  }

  onRowSelect(event: any){
    this.productoSeleccionado = event.data
  }

}


