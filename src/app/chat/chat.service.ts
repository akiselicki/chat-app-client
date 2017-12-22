import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

import { Message } from '../message/index';
import { Room } from '../room/room.model';

@Injectable()
export class ChatService {
  private url = environment.serverUrl;
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  // Emit: on room join
  emitEventOnRoomJoin(room: Room, username: string) {
    const data = { room: room.name, username: username };
    this.socket.emit('join', data);
  }

  // Emit: send public message
  emitEventOnSendPublicMessage(message: Message) {
    this.socket.emit('publicMessage', message);
  }

  // Emit: send room message
  emitEventOnSendRoomMessage(message: Message) {
    this.socket.emit('roomMessage', message);
  }

  // Consume: on user connected
  consumeEvenOnUserConnected() {
    const observable = new Observable((observer) => {
      this.socket.on('userConnected', (msg: string) => {
        observer.next(msg);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  // Consume: on user disconnected
  consumeEvenOnUserDisconnected() {
    const observable = new Observable((observer) => {
      this.socket.on('userDisonnected', (msg: string) => {
        observer.next(msg);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  // Consume: on public message posted
  consumeEvenOnPublicMessagePosted() {
    const observable = new Observable((observer) => {
      this.socket.on('newPublicMessage', (msg: Message) => {
        observer.next(msg);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  // Consume: on room message posted
  consumeEvenOnRoomMessagePosted() {
    const observable = new Observable((observer) => {
      this.socket.on('newRoomMessage', (msg: Message) => {
        observer.next(msg);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
