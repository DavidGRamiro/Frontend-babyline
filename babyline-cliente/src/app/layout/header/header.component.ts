import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, type OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  @Output() sideEvent : EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void { }

  getSideBar(event : any){
    this.sideEvent.emit(true) ;
  }

}
