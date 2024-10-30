import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-movimientos',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './movimientos.component.html',
    styleUrl: './movimientos.component.css',
})
export class MovimientosComponent implements OnInit {

    ngOnInit(): void { }

}
