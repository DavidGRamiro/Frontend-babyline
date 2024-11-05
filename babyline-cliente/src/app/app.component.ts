import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutComponent } from "./layout/layout.component";
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { LoginComponent } from "./components/auth/components/login/login.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LayoutComponent, RouterModule,
    LoginComponent, LoginComponent, RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  // Para ver mas configuraciones visitar  web oficial
  // https://primeng.org/configuration

  private _primeConfig = inject(PrimeNGConfig);
  private _translate = inject(TranslateService)

  constructor(){
    this._translate.setDefaultLang('es');
    this._translate.use('es');
  }

  ngOnInit(): void {

    // Efecto ripple en los componentes de PrimeNG
    this._primeConfig.ripple = true;
    // Configuraciones de idioma
    this._translate.get('primeng').subscribe(res => this._primeConfig.setTranslation(res));


  }


}
