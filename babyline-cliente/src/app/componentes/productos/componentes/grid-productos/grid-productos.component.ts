import { CommonModule } from '@angular/common';
import { Component, inject, Input, type OnInit } from '@angular/core';
import { ProcuctosService } from '../../servicios/procuctos.service';
import { oRespuestaAPI } from '../../../../utils/clases/response';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { FormsModule, ɵFormControlCtor } from '@angular/forms';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-grid-productos',
  standalone: true,
  imports: [
    CommonModule, PrimeNgModule, FormsModule
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

  public items: any[] = [];

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

  cargarItems(){
    this.items = [
      {
          icon: 'pi pi-pencil',
          command: () => {
              this._messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          }
      },
      {
          icon: 'pi pi-refresh',
          command: () => {
              this._messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
          }
      },
      {
          icon: 'pi pi-trash',
          command: () => {
              this._messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          }
      },
      {
          icon: 'pi pi-upload',
          routerLink: ['/fileupload']
      },
      {
          icon: 'pi pi-external-link',
          target:'_blank',
          url: 'http://angular.io'
      }
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
    console.log(table)
  }









}


