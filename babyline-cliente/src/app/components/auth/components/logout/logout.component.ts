import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './logout.component.html',
    styleUrl: './logout.component.scss',
})
export class LogoutComponent implements OnInit {

    ngOnInit(): void { }

}
