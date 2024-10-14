import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, HeaderComponent, SideBarComponent, FooterComponent, RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {

  public showSideBar : boolean = false;

  ngOnInit(): void { }

  getSideEvent(event : any){
    this.showSideBar = event;
  }

  getEventFromSideBar(event:any){
    this.showSideBar = event;
  }



}
