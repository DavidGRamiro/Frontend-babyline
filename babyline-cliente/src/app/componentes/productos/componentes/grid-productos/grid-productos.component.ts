import { CommonModule } from '@angular/common';
import { Component, inject, Input, type OnInit } from '@angular/core';
import { ProcuctosService } from '../../servicios/procuctos.service';
import { oRespuestaAPI } from '../../../../utils/clases/response';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { FormsModule, ɵFormControlCtor } from '@angular/forms';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-grid-productos',
  standalone: true,
  imports: [
    CommonModule, PrimeNgModule, FormsModule
  ],
  templateUrl: './grid-productos.component.html',
  styleUrl: './grid-productos.component.css',
})
export class GridProductosComponent implements OnInit {

  // Servicio de productos
  private _proService = inject(ProcuctosService);

  // Tabla de productos
  public loading: boolean = true;
  public productos : any[] = [];
  public searchValue: string = '';

  // Carga de archivos CSV
  public file!: File;

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(){

    let oResultadoAPI : oRespuestaAPI = new oRespuestaAPI();
    this._proService.obtenerProductos().subscribe({

      next: (data : any) => {
        this.productos = data;
        this.loading = false;
      },
      error: (error) => { }
    })
  }

  // TODO: A determinar valores a la función
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

  // Función para buscar en la tabla Input superior derecho
  buscar(table : Table){ table.filterGlobal(this.searchValue, 'contains') }

  // Evento de carga de archivo de un csv
  uploadCSV(event: any) {
    this.file = event.files[0];
    console.log(this.file)
    this._proService.uploadCSV(this.file).subscribe({
      next: (data : any) => {
        console.log('Subida arcvhivo CSV', data);
      },
      error: (error) => {
        console.log('ERROR CSV', error);
      }
    })
  }











}


