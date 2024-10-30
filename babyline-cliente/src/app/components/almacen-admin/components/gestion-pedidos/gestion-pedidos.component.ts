import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-gestion-pedidos',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './gestion-pedidos.component.html',
    styleUrl: './gestion-pedidos.component.css',
})
export class GestionPedidosComponent implements OnInit {

    ngOnInit(): void { }

}
