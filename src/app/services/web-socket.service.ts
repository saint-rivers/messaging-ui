import { Injectable } from '@angular/core';
import { WebSocketChat } from '../models/web-socket-chat.model';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  stompClient: any = null;
  websocketMessage: WebSocketChat[] = [];
  message: string = '';

  getGroupsOfUser(fakeToken: string): string[] {
    return [
      '3fa85f64-5717-4562-b3fc-2c963f66afa9',
      'af385f64-5717-4562-b3fc-2c963f66afa4',
      'be3a5572-5717-4562-b3fc-2c963f66a4fc',
    ];
  }

  openWebSocketConnection() {
    const socket = new SockJS('http://localhost:8081/ws-chat');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);

      const groups = _this.getGroupsOfUser('faketoken123');

      groups.forEach((group) => {
        console.log('group subscirbing: ' + group);

        _this.stompClient.subscribe(
          `/topic/group/${group}`,
          function (hello: any) {
            console.log(JSON.parse(hello.body));
            _this.showMessage(JSON.parse(hello.body));
          }
        );
      });

      _this.stompClient.subscribe(
        '/topic/user/3fa85f64-5717-4562-b3fc-2c963f66afa6',
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
