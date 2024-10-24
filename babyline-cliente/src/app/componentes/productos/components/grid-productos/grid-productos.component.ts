import { CommonModule } from '@angular/common';
import { Component, inject, Input, type OnInit } from '@angular/core';
import { ProcuctosService } from '../../servicios/procuctos.service';
import { oRespuestaAPI } from '../../../../utils/clases/response';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { FormsModule, ɵFormControlCtor } from '@angular/forms';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
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
  providers: [MessageService]
})
export class GridProductosComponent implements OnInit {

  // Servicio de productos
  private _proService = inject(ProcuctosService);
  private _messageService = inject(MessageService);

  // Tabla de productos
  public productos : any[] = [];
  searchValue: string = '';

  // Items del menu desplegable superior de la tabla
  public items: any[] = [];
  public eAccion : eAccionHTTP = eAccionHTTP.POST;

  bDisplay : boolean = false;

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
        command: () => { this.deleteProducto(); }
      },
      {
        icon: 'pi pi-upload',
        command: () => { this.cargaMasiva(); }
      },
    ];
  }

  // Funcion para obtener el estado del producto
  getStockStatus(stock: number): string {
    if (stock >= 200) {
      return 'Disponible';
    } else if (stock >= 100 && stock < 200) {
      return 'Poco Stock';
    } else if (stock < 100 && stock > 0) {
      return 'Últimas unidades';
    } else {
      return 'Sin Stock';
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
    this.bDisplay = true;
    this.eAccion = eAccionHTTP.PUT;
  }

  // Borrado de prodcuto
  deleteProducto(){}

  // Alta de masiva de productos sobre la base de datos desde CSV
  cargaMasiva(){}

}


