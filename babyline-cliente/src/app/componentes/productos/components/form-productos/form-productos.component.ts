import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { eAccionHTTP } from '../../../../utils/clases/enums';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../../servicios/procuctos.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-form-productos',
    standalone: true,
    imports: [
        CommonModule, PrimeNgModule, FormsModule, ReactiveFormsModule
    ],
    templateUrl: './form-productos.component.html',
    styleUrl: './form-productos.component.css',
})
export class FormProductosComponent implements OnInit {

    @Input() eAccion : eAccionHTTP = eAccionHTTP.POST;
    @Input()  set producto (valor:any){
        if(valor){
            this.producto_formulario = valor;
            this.productoForm.patchValue(valor);
            this.precio_compra = valor.precio_compra;
            this.precio_venta = valor.precio_venta;
            this.stock = valor.stock;
        }
    };

    @Output() eventRes : EventEmitter<any> = new EventEmitter<any>();

    // Servicios
    private _productoService = inject(ProductosService);
    private _messageService = inject(MessageService);

    // Control de estado de los componentes
    public precio_venta  = undefined;
    public precio_compra = undefined;
    public stock  = null;

    public producto_formulario : any = null

    // Formulario
    public productoForm = new FormGroup({
        denominacion_producto: new FormControl('', [Validators.required]),
        codigo_interno: new FormControl('', [Validators.required]),
        precio_venta: new FormControl('', [Validators.required]),
        precio_compra: new FormControl('', [Validators.required]),
        fabricante: new FormControl('', [Validators.required]),  
        ean: new FormControl('', [Validators.required]),  
        categoria: new FormControl(null, []),  
        ubicacion: new FormControl(null, []),  
        stock: new FormControl('', [Validators.required]),
    });

    ngOnInit(): void { 
    }

    constructor() { }

    // Método para dar de alta un producto
    onSubmit() {
        // Validamos el formulario
        if (this.productoForm.invalid) {
            this._messageService.add({severity:'error', summary:'Error', detail:'Existen campos obligatorios sin rellenar'});
            return;
        }

        if(this.eAccion === eAccionHTTP.POST) {
            this._productoService.altaProducto(this.productoForm.value).subscribe({
                next: data => {
                    // Mensaje de creación y emitimos evento para cerrar el modal
                    this.eventRes.emit(false)
                    this._messageService.add({severity:'success', summary:'Producto creado', detail:'Producto dado de alta correctamente'});
                },
                error: error => {
                    this._messageService.add({severity:'error', summary:'Error', detail:'Error al dar de alta el producto'});
                }
            })
        }else{

            this._productoService.editarProducto(this.producto_formulario.id, this.productoForm.value).subscribe({
                next: data => {
                    // Mensaje de creación y emitimos evento para cerrar el modal
                    this.eventRes.emit(false)
                    this._messageService.add({severity:'success', summary:'Producto editado', detail:'Producto editado correctamente'});
                },
                error: error => {
                    this._messageService.add({severity:'error', summary:'Error', detail:'Error al editar el producto'});
                }
            })
        }

    }


}
