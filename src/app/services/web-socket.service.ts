import { Injectable } from '@angular/core';
import { WebSocketChat } from '../models/web-socket-chat.model';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  stompClient: any = null;
  websocketMessage: WebSocketChat[] = [];
  message: string = '';

  constructor() {
    console.log('loaded');
  }

  openWebSocketConnection() {
    const socket = new SockJS('http://localhost:8081/ws-chat');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe(
        '/topic/user/3fa85f64-5717-4562-b3fc-2c963f66afa6',
        function (hello: any) {
          console.log(JSON.parse(hello.body));
          _this.showMessage(JSON.parse(hello.body));
        }
      );
      _this.stompClient.subscribe(
        '/topic/group/3fa85f64-5717-4562-b3fc-2c963f66afa9',
        function (hello: any) {
          console.log(JSON.parse(hello.body));
          _this.showMessage(JSON.parse(hello.body));
        }
      );

    });
  }

  sendWebSocketMessage(message: any) {
    this.stompClient.send('/current/resume', {}, JSON.stringify(message));
    this.message = '';
  }

  showMessage(message: WebSocketChat) {
    this.websocketMessage.push({ id: message.id, payload: message.payload });
  }

  closeWebsocketConnection() {
    this.stompClient.close();
  }
}
