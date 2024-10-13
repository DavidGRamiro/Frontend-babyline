import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../utils/primeNG/primeNg.module';
import { MenuItem } from 'primeng/api';

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
                label: 'Documents',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus',
                        routerLink: ['/productos']
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-search'
                    }
                ]
            },
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog'
                    },
                    {
                        label: 'Logout',
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
