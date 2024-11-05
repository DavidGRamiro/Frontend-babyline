import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit, Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeNgModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent implements OnInit {

  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _msgService = inject(MessageService);
  
  ngOnInit(): void {}

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    if (this.loginForm.valid) {
      // Inicio de sesión y almacenamiento de datos en storage
      this._authService.login(this.loginForm.value).subscribe({
        next : (data:any) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this._msgService.add({severity:'success', life:2000, summary:'Bienvenido', detail:'Sesion iniciada correctamente'});
          setTimeout(() => {
            this._router.navigate(['/home']);
          }, 1500);
        },
        error: (error:any) => {
          this._msgService.add({severity:'error', life:4000, summary:'No se ha podido iniciar sesión', detail:'Por favor, compruebe que el nombre y contraseña se ha introducido correctamente'});
        }
      })
    }
  }
}
