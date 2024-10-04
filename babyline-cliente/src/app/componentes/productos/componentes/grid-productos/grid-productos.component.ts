import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { ProcuctosService } from '../../servicios/procuctos.service';
import { oRespuestaAPI } from '../../../../utils/clases/response';

@Component({
  selector: 'app-grid-productos',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './grid-productos.component.html',
  styleUrl: './grid-productos.component.css',
})
export class GridProductosComponent implements OnInit {

  // Servicio de productos
  private _proService = inject(ProcuctosService);

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(){

    let oResultadoAPI : oRespuestaAPI = new oRespuestaAPI();
    this._proService.obtenerProductos().subscribe({

      next: (data : any) => {
        // Implementacion de la clase oRespuestaAPI común
        let respuesta = oResultadoAPI.capturaResultadoAPI(data);
        console.log(respuesta);

      },
      error: (error) => {
        console.log(error);
      }
    })
  }







}


