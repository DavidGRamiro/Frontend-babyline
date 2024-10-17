import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    DialogModule,
    SidebarModule,
    MenuModule,
    MultiSelectModule,
    TagModule,
    DropdownModule,
    FileUploadModule
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    TableModule,
    DialogModule,
    SidebarModule,
    MenuModule,
    MultiSelectModule,
    TagModule,
    DropdownModule,
    FileUploadModule
  ]
})
export class PrimeNgModule { }
