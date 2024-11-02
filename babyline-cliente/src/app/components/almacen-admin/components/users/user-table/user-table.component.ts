import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../../utils/primeNG/primeNg.module';
import { UsersService } from '../../../services/users.service';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    CommonModule, PrimeNgModule, FormsModule
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
  providers: [MessageService, ConfirmationService], 
})
export class UserTableComponent implements OnInit {

  @Output() eventRes : EventEmitter<any> = new EventEmitter<any>();

  // Servicios
  private _userService = inject(UsersService);
  private _rolService = inject(RolesService);
  private _messageService = inject(MessageService);
  private _confirmationService = inject(ConfirmationService);


  public usuarios : any = [];
  public roles : SelectItem[] = [];

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }

  // Cargamos todos los usuarios que estan dados de alta en la BBDD
  getUsers(){
    this._userService.getUsers().subscribe({
      next: (data) => {
        this.usuarios = data
      },
      error: (error) => {
        this._messageService.add({severity:'error', summary:'Error', detail:'Error al cargar los usuarios'});
      }
    });
  }

  // Cargamos todos los roles que estan dados de alta en la BBDD
  getRoles(){
    this._rolService.getRoles().subscribe({
      next: (data :any) => {
        let response = data;
        response.forEach((rol:any) => {
          this.roles.push({label: rol.denominacion, value: rol.id})          
        });
      },
      error: (error) => {
        this._messageService.add({severity:'error', summary:'Error', detail:'Error al cargar los roles'});
      }
    });
  }

  // Evento de edicion de un usuario
  editarUsuario(event:any, row : any){
    if(event.target.className === "p-button-icon pi pi-check"){
      this._userService.updateUsuario(row).subscribe({
        next: (data) => {
          this._messageService.add({severity:'success', summary:'Exito', detail:'Usuario actualizado correctamente'});
          setTimeout(() => {
            this.getUsers();
          }, 2000);
        },
        error: (error) => {
          this._messageService.add({severity:'error', summary:'Error', detail:'Error al actualizar el usuario'});
        }
      });
    }
  }

  confirm(user:any) {
    this._confirmationService.confirm({
        
        message: `¿Estás seguro de que quieres eliminar ${user.nombre} ?`,
        header: 'Eliminar usuario',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        acceptButtonStyleClass:"p-button-text-success",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          this.eliminarUsuario(user);
        },
        reject: () => {
          return
        }
    });
  }

  eliminarUsuario(user:any){
    this._userService.deleteUser(user.id).subscribe({
      next: (data : any) => {
        this._messageService.add({severity:'success', summary:'Exito', detail:'Usuario eliminado correctamente'});
        setTimeout(() => {
          this.getUsers();
        }, 2000);
      },
      error: (error) => {
        console.log(error)
        this._messageService.add({severity:'error', summary:'Error', detail:'Error al eliminar el usuario'});
      }
    });
  }

  volver(event:boolean){
    this.eventRes.emit(event)
  }


}
