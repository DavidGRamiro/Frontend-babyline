import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeNgModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  private _authService = inject(AuthService);

  ngOnInit(): void {}

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    if (this.loginForm.valid) {
      
      this._authService.login(this.loginForm.value).subscribe({
        next : (data:any) => {
          console.log('Sesion iniciada',data);
        },
        error: (error:any) => {
          console.log(error);
        }
      })


    }
  }
}
