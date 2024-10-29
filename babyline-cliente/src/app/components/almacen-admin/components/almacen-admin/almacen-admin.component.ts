import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';

@Component({
    selector: 'app-almacen-admin',
    standalone: true,
    imports: [
        CommonModule, PrimeNgModule
    ],
    templateUrl: './almacen-admin.component.html',
    styleUrl: './almacen-admin.component.css',
})
export class AlmacenAdminComponent implements OnInit {

    ngOnInit(): void { }

    constructor() { }

}
