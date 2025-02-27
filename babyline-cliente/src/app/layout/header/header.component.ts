import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, type OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from '../../utils/primeNG/primeNg.module';
import { ConfirmationService, MenuItem, MessageService, Message } from 'primeng/api';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, RouterModule, PrimeNgModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class HeaderComponent implements OnInit {

  @Output() sideEvent : EventEmitter<boolean> = new EventEmitter<boolean>();

  private _confirmationService = inject(ConfirmationService)
  private _messageService = inject(MessageService)

  public showModalFichaje : boolean = false
  public notIniciado : boolean = true;


  ngOnInit(): void {
    localStorage.setItem('fichar', 'false')
  }

  getSideBar(event : any){
    this.sideEvent.emit(true);
  }

  // Confirmacion de inicio/fin de jornada laboral.
  fichar(event : Event){
    let data = localStorage.getItem('fichar')?.valueOf()
    let isIn = data == 'true'
    if(!isIn){
      this._confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Vas a proceder a empezar la jornada laboral. ¿ Deseas continuar ?',
        header: 'Inicio de jornada',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"",
        rejectIcon:"",
        acceptButtonStyleClass:"p-button-text p-button-text mr-2",
        rejectButtonStyleClass:"p-button-danger p-button-text mr-2",
        accept: () => {
            localStorage.setItem('fichar', 'true')
            localStorage.setItem('time', new Date().toString())

            this.notIniciado = false
            this._messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Has iniciado la jornada laboral.' });
        },
        reject: () => {
            this._messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'El menú seguirá deshabilitado hasta que se inicie la jornada laboral.', life: 3000 });
        }
    });
    }else{
      this._confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Vas a proceder a terminar la jornada laboral. ¿ Deseas continuar ?',
        header: 'Fin de jornada',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"",
        rejectIcon:"",
        acceptButtonStyleClass:"p-button-text p-button-text mr-2",
        rejectButtonStyleClass:"p-button-danger p-button-text mr-2",
        accept: () => {
            localStorage.setItem('fichar', 'false')
            localStorage.setItem('time', new Date().toString())
            this.notIniciado = true
            this._messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Fin de jornada laboral ¡Hasta mañana!.' });
        },
        reject: () => {
            this._messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'No has terminado la jornada laboral.', life: 3000 });
        }
    });
    }

  }

}
