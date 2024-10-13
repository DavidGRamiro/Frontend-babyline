import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutComponent } from "./layout/layout.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LayoutComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  // Para ver mas configuraciones visitar  web oficial
  // https://primeng.org/configuration

  private _primeConfig = inject(PrimeNGConfig);

  constructor(){}

  ngOnInit(): void {

    // Efecto ripple en los componentes de PrimeNG
    this._primeConfig.ripple = true;
  }


}
