import { CommonModule } from '@angular/common';
import { Component, inject, Input, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../../utils/primeNG/primeNg.module';
import { SocketService } from '../../../../auth/services/socket.service';
import { ProductosService } from '../../../../productos/services/productos.service';
import { FormsModule } from '@angular/forms';
import { PedidosService } from '../../../../pedidos/services/pedidos.service';
import { error } from 'console';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from '../../../services/users.service';
import { firstValueFrom } from 'rxjs';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-gestion-pedidos-grid',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, FormsModule],
  templateUrl: './gestion-pedidos-grid.component.html',
  styleUrl: './gestion-pedidos-grid.component.css',
  providers: [ConfirmationService, MessageService]
})
export class GestionPedidosGridComponent implements OnInit {

  @Input() tienda : string = '';

  private _pedidoService = inject(PedidosService);
  private webSocketService = inject(SocketService);
  private _userService = inject(UsersService);

  public cols!: Column[];
  public products!: any[];
  public usuarios: any[] = []

  public usuarioSeleccionado: any | undefined;

  ngOnInit(): void {
    this.getPedidos()
  }

  constructor(private confirmationService: ConfirmationService,
              private messageService:MessageService
  ) {
    this.cols = [
      { field: 'numero_pedido', header: 'Nº de pedido' },
      { field: 'items', header: 'Nº de productos' },
      { field: 'fc_pedido', header: 'Fecha' },
    ];
  }

  async getPedidos() {
    await this.getUsers()

    let params = { tienda : this.tienda }
    this._pedidoService.getPedidos(params).subscribe(
      (data: any) => {
        this.products = data
        
      },
      error => {
        console.error(error)
      }
    )
  }

  getEstado(estado : string){
    switch (estado) {
      case 'En curso':
          return 'info';
      case 'Finalizado':
          return 'success';
      case 'Sin empezar':
          return 'secondary';
      default:
          return 'secondary';
    }
  }

  // Hacemos la función asincrona por que debemos de esperar a que se hayan cargados que forman el select box
  confirm(event:any,pedido: any) {
    try {
      // Una vez creados formamos el mensaje
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Por favor, seleccione el usuario al que desea asignar el pedido',
        acceptIcon: 'pi pi-check mr-1',
        rejectIcon: 'pi pi-times mr-1',
        acceptLabel: 'Asignar',
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass: 'p-button-outlined p-button-sm',
        acceptButtonStyleClass: 'p-button-sm',
        accept: () => {
          this.asignarPedidoUsuario(pedido)
        },
        reject: () => { }
      });
    }
    catch (error) {
      console.error(error)
    }
    
  }
  // Función asíncrona para poder recuperar los usuarios
  async getUsers(){
    try {
      const users = await firstValueFrom(this._userService.getUsers())  
      users.forEach((user: any) => {
        this.usuarios?.push({ name: user.nombre, value: user.id })
      });
    }
    catch (error) {
      console.error(error)
    }
  }

  // Método que asignamos un pedido a un usuario
  asignarPedidoUsuario( pedido : any){
    console.log(pedido)
    let data = {...pedido}
    data.id_fk_usuario = this.usuarioSeleccionado.value
    
    this._pedidoService.updatePedido(pedido.id, data).subscribe({
      next: (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Pedido asignado', detail: 'El pedido se ha asignado correctamente', life: 3000 });
        this.getPedidos()
      },
      error: (error: any) => {
        console.error(error)
      }
    })
    
  }


}
