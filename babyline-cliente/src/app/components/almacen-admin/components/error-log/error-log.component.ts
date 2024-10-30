import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-error-log',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './error-log.component.html',
    styleUrl: './error-log.component.css',
})
export class ErrorLogComponent implements OnInit {

    ngOnInit(): void { }

}
