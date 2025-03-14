import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../utils/primeNG/primeNg.module';
import { MenuItem, MessageService } from 'primeng/api';
import { PrimeIcons } from 'primeng/api';
import { AuthService } from '../../components/auth/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule, PrimeNgModule, RouterModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  providers: [ MessageService]
})
export class SideBarComponent implements OnInit {

  @Input() showSideBar! : boolean;
  @Output() onCloseEmit : EventEmitter<boolean> = new EventEmitter<boolean>();

  private _authService = inject(AuthService)
  private _messageService = inject(MessageService)

  items: MenuItem[] | undefined;
  public isAdmin : boolean = false

  constructor( private _router : Router){}
    
  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user')!)
    if(user !== null){
      this.isAdmin = user.id_fk_rol__denominacion === 'Administrador' || 'Super usuario' ? true : false
    }

      this.items = [
        {
          label: 'Almacén',
          items: [
            {
                label: 'Productos',
                icon: PrimeIcons.TAG,
                routerLink: ['/home/productos'],
                command: (event) => this.onMenuItemClick(event)
            },
            {
              label: 'Alta en almacén',
              icon: PrimeIcons.PLUS,
              disabled: !this.isAdmin,
              routerLink: ['/home/almacen'],
              command: (event) => this.onMenuItemClick(event)
            },
            {
              label: 'Pedidos',
              icon: PrimeIcons.BOOK,
              routerLink: ['/home/pedidos'],
              command: (event) => this.onMenuItemClick(event)
            },
          ]
        },
        {
            label: 'Usuario',
            items: [
                {
                    label: 'Cerrar sesión',
                    icon: 'pi pi-sign-out',
                    command : (event) => this.cerrarSesion()
                }
            ]
        }
      ];
    }


  visibleChange(event : any){
    this.onCloseEmit.emit(event)
  }

  onMenuItemClick(event: any) {
    this.onCloseEmit.emit(false);
  }

  // Llamada al backend para limpiar el token de inicio de sesion
  cerrarSesion(){
    this._authService.logout().subscribe({
      next: (data : any) => {
        this.onMenuItemClick(null)
        this._messageService.add({ severity: 'success', summary: 'Hasta pronto', detail: 'Sesión cerrada correctamente'})
        // Limpiamos todas las variables del localStorage al cerrar la sesión
        localStorage.clear()
        setTimeout(() => {
          this._router.navigate(['/login'])
        },3000)
      },
      error : (err : any) => {
        this._messageService.add({ severity: 'error', summary: 'Ha ocurrido un error', detail: 'No se ha podido cerrar la sesión. Error interno del servidor.'})

      }
    })
  }

}
