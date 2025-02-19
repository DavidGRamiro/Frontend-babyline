import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { Message } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { SyncService } from '../../services/sync.service';

@Component({
    selector: 'app-sync',
    standalone: true,
    imports: [
        CommonModule, PrimeNgModule, FormsModule
    ],
    templateUrl: './sync.component.html',
    styleUrl: './sync.component.css',
})
export class SyncComponent implements OnInit {


  //Servicios
  private _syncService  = inject(SyncService)

  // Mensajes de informacion
  public messages_info: Message[] = [];
  public messages_info_2: Message[] = [];

  // Construcotr de SelectBox
  public BBDDSeleccionada : any = null
  public BBDD : any[] = [
    {code: 1,  name: 'BBDD 1'},
    {code: 2,  name: 'BBDD 2'},
    {code: 3,  name: 'Todas'},
  ]
  // Variable control de estado
  public loading : boolean = false;


  ngOnInit() {
      this.messages_info = [{ severity: 'info', detail: 'Panel de sincronizacion de base de datos.' }];
      this.messages_info_2 = [{ severity: 'contrast', detail: 'Este proceso se lanzara automaticamente en cada actualizacion del producto, pero puedes hacerlo manualmente desde esta ventana.' }];
  }

  syncBBDD(){
    this.loading = false
    console.log('Sincronizando')
    this._syncService.sincronizar().subscribe({
      next :( data:any) => {
        console.log(data)
      },
      error : (err: any) => {
        console.log(err)
      }
    })
  
  }

}
