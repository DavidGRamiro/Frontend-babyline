import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { Message, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { SyncService } from '../../services/sync.service';
import { debounce, debounceTime, switchMap } from 'rxjs';

@Component({
    selector: 'app-sync',
    standalone: true,
    imports: [
        CommonModule, PrimeNgModule, FormsModule
    ],
    templateUrl: './sync.component.html',
    styleUrl: './sync.component.css',
    providers : []
})
export class SyncComponent implements OnInit {

  @Output() evenRes : EventEmitter<boolean> = new EventEmitter<boolean>()
  
  //Servicios
  private _syncService  = inject(SyncService)
  private _messageService = inject(MessageService)

  // Mensajes de informacion
  public messages_info: Message[] = [];
  public messages_info_2: Message[] = [];

  // Construcotr de SelectBox. Anadir las bases de datos alternativas en caso necesario.
  public BBDDSeleccionada : any = null
  public BBDD : any[] = [
    {code: 1,  name: 'Todas las Base de Datos'},
  ]
  // Variable control de estado
  public loading : boolean = false;


  ngOnInit() {
      this.messages_info = [{ severity: 'info', detail: 'Panel de sincronizacion de base de datos.' }];
      this.messages_info_2 = [{ severity: 'contrast', detail: 'Este proceso se lanzara automaticamente en cada actualizacion del producto, pero puedes hacerlo manualmente desde esta ventana.' }];
  }

  // Boton de sincronizar base de datos.
  syncBBDD(){
    this.loading = true
    this._syncService.sincronizar()
    .subscribe({
      next :( data:any) => {
        setTimeout(() => {
          this.evenRes.emit(false)
          this.loading = false;
        },2000)
        this._messageService.add({ severity: 'success', summary: 'Actualizacion', detail: 'La base de datos, ha sido sincronizada' })
      },
      error : (err: any) => {
        this._messageService.add({ severity: 'error', summary: 'Error de actualizacioon', detail:'Por favor, contacte con el administrador.', sticky: true})
      }
    })
  
  }

}
