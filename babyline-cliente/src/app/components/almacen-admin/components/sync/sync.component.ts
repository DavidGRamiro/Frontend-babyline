import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-sync',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './sync.component.html',
    styleUrl: './sync.component.css',
})
export class SyncComponent implements OnInit {

    ngOnInit(): void { }

}
