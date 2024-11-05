import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { MovimientosService } from '../../services/movimientos.service';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, PrimeNgModule],
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.css',
})
export class MovimientosComponent implements OnInit {
  
  private _movService = inject(MovimientosService);
  public trazas : any = [];

  ngOnInit(): void {
    this.showTrazas();
  }

  showTrazas() {
    this._movService.getMovimientos().subscribe({
      next: (data) => {
        this.trazas = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
