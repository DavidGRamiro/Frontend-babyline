import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, type OnInit } from '@angular/core';
import { UserFormComponent } from "./user-form/user-form.component";

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [
    CommonModule, UserFormComponent
],
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {

    @Output() eventRes : EventEmitter<any> = new EventEmitter<any>();

    ngOnInit(): void { }

    // Emision del evento al componente padre 
    getEmitterForm(event:any){
        this.eventRes.emit(event);
    }

}
