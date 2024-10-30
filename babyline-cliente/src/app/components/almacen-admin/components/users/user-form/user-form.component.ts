import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../../utils/primeNG/primeNg.module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {

  @Input() usuario : any = null
  @Output() eventRes : EventEmitter<any> = new EventEmitter<any>();

  private _userService = inject(UsersService);
  private _messageService = inject(MessageService);

  public passwordValue : string = '';

  // Formulario
  public formUser = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required),
  });

  // Radio button con los roles disponibles para cada usuario
  public roles = [
    { name: 'Super usuario', key: 'A', value: '1'},
    { name: 'Administrador', key: 'U', value: '2' },
    { name: 'Logística', key: 'L', value: '3' },
    { name: 'Oficina', key: 'O', value: '4' },
  ];

  ngOnInit(): void {}

  // Obtenemos todos los usuarios y mostramos una tabla informativa
  getUsuarios() {
    this._userService.getUsers().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Dar de alta un nuevo usuario
  altaUsuario() {
    
    let validador = this.formUser.valid;
    let usuario = {...this.formUser.value};
    let rol = this.roles.find((rol) => rol.key === usuario.rol);
    usuario.rol = rol!.value;

    if (validador) {
      this._userService.altaUsuario(usuario).subscribe({
        next: (data) => {
          this.eventRes.emit(false)
          this._messageService.add({
            severity: 'success',
            summary: 'Nuevo usuario',
            detail: 'Se ha dado de alta un nuevo usuario',
          });
        },
        error: (error) => {
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se ha podido dar de alta el usuario por error interno',
          });
        },
      });
    } else {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debes de rellenar todos los campos obligatorios',
      });
    }
  }
}
