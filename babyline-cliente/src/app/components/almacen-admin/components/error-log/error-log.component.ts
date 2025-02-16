import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../utils/primeNG/primeNg.module';
import { ErrorLogService } from '../../services/errorlog.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-error-log',
  standalone: true,
  imports: [CommonModule, PrimeNgModule],
  templateUrl: './error-log.component.html',
  styleUrl: './error-log.component.css',
})
export class ErrorLogComponent implements OnInit {
  
  // Servicios
  private _errorLogService = inject(ErrorLogService);
  
  public errorLogs : any[] = []
  public messages: Message[] = [];


  ngOnInit(): void {
    this.getErrors()
    this.messages = [{ severity: 'info', detail: 'Informe de errores encontrados en pedidos.' }];
  }

  getErrors() {
    this._errorLogService.getErrors().subscribe({
      next: (data: any) => {
        this.errorLogs = data
        console.log(this.errorLogs)

      },
      error : (err: any) => {
        console.log(err)
      }
    });
  }
}
