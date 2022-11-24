import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { WebSocketChat } from '../../models/web-socket-chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  websocket: WebSocketService;

  constructor(private websocketService: WebSocketService) {
    this.websocket = websocketService;
  }

  ngOnInit(): void {
    this.websocketService.openWebSocketConnection();
  }

  ngOnDestroy(): void {
    this.websocketService.closeWebsocketConnection();
  }

  sendMessage() {
    const chatMsg: WebSocketChat = { id: '123', payload: 'asd' };
    this.websocketService.sendWebSocketMessage(chatMsg);
  }
}
