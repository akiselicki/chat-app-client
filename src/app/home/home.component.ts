import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/index';
import { Room, RoomService } from '../room/index';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Chat App';
  usernameInput: string;
  username: string;
  selectedRoom: Room;
  newRoom: Room;
  rooms: Room[] = [];
  roomsPage = 1;
  roomsEnd: boolean;

  constructor(private router: Router,
    private userService: UserService,
    private roomService: RoomService) { }

  ngOnInit() {
    this.selectedRoom = <Room>{};
    this.newRoom = <Room>{};
    this.username = this.userService.getUsername();
    if (this.username) {
      this.usernameInput = this.username;
      this.getRooms();
    }
  }

  enter(username: string) {
    if (username) {
      this.username = username;
      this.userService.setUsername(this.username);
      this.getRooms();
    }
  }

  join(room: Room, pass?: string) {
    if (room && room.name && (!room.pass || room.pass === pass)) {
      this.roomService.setActiveRoom(room);
      this.router.navigateByUrl('/chat');
    }
  }

  create(room: Room) {
    if (room.name && room.pass) {
      this.roomService.createRoom(room).subscribe((savedRoom) => {
        this.roomService.setActiveRoom(savedRoom);
        this.router.navigateByUrl('/chat');
      });
    }
  }

  getRooms() {
    if (!this.roomsEnd) {
      this.roomService.getRooms(this.roomsPage).subscribe((data: any) => {
        if (data.docs && data.docs.length > 0) {
          this.rooms.push(...data.docs);
        }
        if (data.page === data.pages) {
          this.roomsEnd = true;
        } else {
          this.roomsPage++;
          this.getRooms();
        }
      });
    }
  }

}
