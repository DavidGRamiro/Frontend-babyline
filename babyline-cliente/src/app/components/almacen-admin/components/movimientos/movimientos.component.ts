import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { MovimientosService } from '../../services/movimientos.service';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, PrimeNgModule],
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.css',
})
export class MovimientosComponent implements OnInit {
  
  // Servicios
  private _movService = inject(MovimientosService);
  private _msgService = inject(MessageService);

  public trazas : any = [];

  ngOnInit(): void {
    this.showTrazas();
  }

  showTrazas() {
    this._movService.getMovimientos().subscribe({
      next: (data) => {
        this.trazas = data;
      },
      error: (error) => {
        this._msgService.add({severity:'error', summary:'Error', detail:'No se ha podido cargar el historial de movimientos'});
      }
    })
  }
}
