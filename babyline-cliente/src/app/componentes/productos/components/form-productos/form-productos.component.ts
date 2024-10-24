import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { eAccionHTTP } from '../../../../utils/clases/enums';

@Component({
    selector: 'app-form-productos',
    standalone: true,
    imports: [
        CommonModule, PrimeNgModule
    ],
    templateUrl: './form-productos.component.html',
    styleUrl: './form-productos.component.css',
})
export class FormProductosComponent implements OnInit {

    @Input() eAccion : eAccionHTTP = eAccionHTTP.POST;
    

    ngOnInit(): void { }

    constructor() { }



}
