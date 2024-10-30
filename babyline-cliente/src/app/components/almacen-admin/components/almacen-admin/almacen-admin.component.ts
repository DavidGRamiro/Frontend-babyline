import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { ErrorLogComponent } from '../error-log/error-log.component';
import { GestionPedidosComponent } from '../gestion-pedidos/gestion-pedidos.component';
import { MovimientosComponent } from '../movimientos/movimientos.component';
import { SyncComponent } from '../sync/sync.component';
import { UsersComponent } from '../users/users.component';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-almacen-admin',
    standalone: true,
    imports: [
        CommonModule, PrimeNgModule, ErrorLogComponent, GestionPedidosComponent,
        MovimientosComponent, SyncComponent, UsersComponent
    ],
    templateUrl: './almacen-admin.component.html',
    styleUrl: './almacen-admin.component.css',
    providers: [MessageService]
})
export class AlmacenAdminComponent implements OnInit {

    public showMov: boolean = false;
    public showGestion: boolean = false;
    public showControl: boolean = false;
    public showLogError: boolean = false;
    public showSync: boolean = false
    public bDisplay: boolean = false;

    public titleForm: string = '';

    ngOnInit(): void { }

    constructor() { }

    showMovimientos() { 
        this.bDisplay = true;
        this.showMov = true;
        this.titleForm = 'Movimientos';
    }
    
    showGestionUsers() { 
        this.showGestion = true;
        this.bDisplay = true;
        this.titleForm = 'Gestión de usuarios';
    }

    showControlPedidos() { 
        this.bDisplay = true;
        this.showControl = true; 
        this.titleForm = 'Control de pedidos';
    }

    showErrors() { 
        this.bDisplay = true;
        this.showLogError = true; 
        this.titleForm = 'Visalización de errores';
    }

    syncBBDD() { 
        this.bDisplay = true;
        this.showSync = true; 
        this.titleForm = 'Sincronización de la base de datos';
    }

    closeAll() {
        this.bDisplay = false;
        this.showMov = false;
        this.showGestion = false;
        this.showControl = false;
        this.showLogError = false;
        this.showSync = false;
    }

    getEmitterUser(event: any) {
        this.closeAll();
    }
}
