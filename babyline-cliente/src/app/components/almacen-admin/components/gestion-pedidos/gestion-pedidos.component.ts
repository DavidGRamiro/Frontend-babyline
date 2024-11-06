import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { GestionPedidosGridComponent } from './gestion-pedidos-grid/gestion-pedidos-grid.component';

@Component({
    selector: 'app-gestion-pedidos',
    standalone: true,
    imports: [
        CommonModule, PrimeNgModule, GestionPedidosGridComponent
    ],
    templateUrl: './gestion-pedidos.component.html',
    styleUrl: './gestion-pedidos.component.css',
})
export class GestionPedidosComponent implements OnInit {

    ngOnInit(): void { }

}
