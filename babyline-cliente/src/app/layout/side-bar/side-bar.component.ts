import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../utils/primeNG/primeNg.module';
import { MenuItem } from 'primeng/api';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule, PrimeNgModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent implements OnInit {

  @Input() showSideBar! : boolean;
  @Output() onCloseEmit : EventEmitter<boolean> = new EventEmitter<boolean>();


  items: MenuItem[] | undefined;

    ngOnInit() {
      this.items = [
        {
          label: 'Almacén',
          items: [
            {
                label: 'Productos',
                icon: PrimeIcons.TAG,
                routerLink: ['/productos']
            },
            {
              label: 'Alta en almacén',
              icon: PrimeIcons.PLUS,
            },
            {
              label: 'Pedidos',
              icon: PrimeIcons.BOOK,
            },
            {
              label: 'Búsqueda rápida',
              icon: PrimeIcons.SEARCH,
            },
          ]
        },
        {
            label: 'Usuario',
            items: [
                {
                    label: 'Ajustes',
                    icon: 'pi pi-cog'
                },
                {
                    label: 'Cerrar sesión',
                    icon: 'pi pi-sign-out'
                }
            ]
        }
      ];
    }


  visibleChange(event : any){
    this.onCloseEmit.emit(event)
  }

}
