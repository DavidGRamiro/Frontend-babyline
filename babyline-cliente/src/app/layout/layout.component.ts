import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { CardsComponent } from './cards/cards.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, HeaderComponent, SideBarComponent, RouterModule, CardsComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {

  public showSideBar : boolean = false;
  public isHomePage : boolean = true;

  ngOnInit(): void {
    this._router.events.subscribe((e) => {
      this.isHomePage = this._router.url === '/home' 
    })
  }

  constructor(private _router : Router){}

  getSideEvent(event : any){
    this.showSideBar = event;
  }

  getEventFromSideBar(event:any){
    this.showSideBar = event;
  }

}
