import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { MatTableDataSource } from '@angular/material';

import { ChatService } from './chat.service';
import { Message, MessageService } from '../message/index';
import { UserService } from '../user/index';
import { Room, RoomService } from '../room/index';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService, MessageService]
})
export class ChatComponent implements OnInit, OnDestroy {
  username: string;
  room: Room;
  message: string;

  consumeEvenOnUserConnected;
  consumeEvenOnUserDisconnected;
  // consumeEvenOnPublicMessagePosted;
  consumeEvenOnRoomMessagePosted;

  displayedColumns = ['date', 'sender', 'message'];
  dataSource = new MatTableDataSource<Message>();

  initFinished: boolean;
  messagesPage = 1;
  messagesEnd: boolean;

  constructor(
    private router: Router,
    private toasterService: ToasterService,
    private userService: UserService,
    private roomService: RoomService,
    private messageService: MessageService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    if (!this.userService.getUsername() || !this.roomService.getActiveRoom()) {
      this.router.navigateByUrl('/');
      return;
    }
    this.username = this.userService.getUsername();
    this.room = this.roomService.getActiveRoom();
    this.getMessages();
    this.chatService.emitEventOnRoomJoin(this.room, this.username);
    this.consumeEvenOnUserConnected = this.chatService
      .consumeEvenOnUserConnected()
      .subscribe((info: string) => {
        this.toasterService.pop('info', info);
      });
    this.consumeEvenOnUserDisconnected = this.chatService
      .consumeEvenOnUserDisconnected()
      .subscribe((info: string) => {
        this.toasterService.pop('info', info);
      });
    // this.consumeEvenOnPublicMessagePosted = this.chatService.consumeEvenOnPublicMessagePosted().subscribe((message: Message) => {
    //   this.toasterService.pop('info', 'New public message');
    //   this.addItemToDataSource(message);
    // });
    this.consumeEvenOnRoomMessagePosted = this.chatService
      .consumeEvenOnRoomMessagePosted()
      .subscribe((message: Message) => {
        this.toasterService.pop('info', 'New message');
        this.addDataToDataSource(message);
      });
    this.initFinished = true;
  }

  ngOnDestroy() {
    if (this.initFinished) {
      this.consumeEvenOnUserConnected.unsubscribe();
      this.consumeEvenOnUserDisconnected.unsubscribe();
      // this.consumeEvenOnPublicMessagePosted.unsubscribe();
      this.consumeEvenOnRoomMessagePosted.unsubscribe();
    }
  }

  post() {
    if (this.message) {
      const message = new Message();
      message.sender = this.username;
      message.text = this.message;
      message.date = new Date();
      // this.chatService.emitEventOnSendPublicMessage(message);
      this.messageService.postMessage(message, this.room._id).subscribe(() => {
        this.chatService.emitEventOnSendRoomMessage(message);
        this.addDataToDataSource(message);
        this.message = '';
      });
    }
  }

  addDataToDataSource(data) {
    if (data instanceof Array) {
      this.dataSource.data.push(...data);
    } else {
      this.dataSource.data.push(data);
    }
    this.dataSource._updateChangeSubscription();
  }

  leave() {
    this.roomService.leaveRoom();
    this.router.navigateByUrl('/');
  }

  getMessages() {
    if (!this.messagesEnd) {
      this.messageService.getMessages(this.room._id, this.messagesPage).subscribe((data: any) => {
        if (data.docs && data.docs.length > 0) {
          this.addDataToDataSource(data.docs);
        }
        if (data.page === data.pages) {
          this.messagesEnd = true;
        } else {
          this.messagesPage++;
          this.getMessages();
        }
      });
    }
  }
}
