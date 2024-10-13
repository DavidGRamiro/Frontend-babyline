import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    DialogModule,
    SidebarModule,
    MenuModule
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    TableModule,
    DialogModule,
    SidebarModule,
    MenuModule
  ]
})
export class PrimeNgModule { }
