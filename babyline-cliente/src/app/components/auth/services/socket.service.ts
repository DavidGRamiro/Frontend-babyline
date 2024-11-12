import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private socket!: WebSocket;
  private serverUrl: string = 'ws://127.0.0.1:8000/ws/chat/'; // URsL de tu servidor WebSocket
  private token: string | null = ''
  private tokenservice = inject(HeaderService)
  constructor() {}


  connectToChat(receiverUsername: string): void {
    // Construir la URL para conectarse al chat de un usuario específico
    this.token = localStorage.getItem('token');
    const user = localStorage.getItem('username'); 
    const url = `${this.serverUrl}${'david'}/?token=${this.token}`;  
    

    this.socket = new WebSocket(url);
  }

  // Método para enviar mensajes al servidor
  sendMessage(message: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ message }));
    }
  }

  // Método para recibir mensajes del servidor
  listenForMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.onmessage = (event) => {
        observer.next(JSON.parse(event.data));
      };
    });
  }

  // Método para cerrar la conexión
  closeConnection(): void {
    this.socket.close();
  }
}
