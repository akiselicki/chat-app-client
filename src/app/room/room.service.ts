import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Room } from './room.model';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class RoomService {
  private apiUrl = `${environment.serverUrl}/api`;
  private baseUrl = `${this.apiUrl}/rooms`;
  private limit = environment.pageSize;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  setActiveRoom(room: Room) {
    this.localStorageService.store('room', room);
  }

  getActiveRoom() {
    return this.localStorageService.retrieve('room');
  }

  leaveRoom() {
    this.localStorageService.clear('room');
  }

  getRooms(page: number): Observable<Room[]> {
    return this.http.get(`${this.baseUrl}?page=${page}&limit=${this.limit}`).map(res => {
      return res['data'] as any;
    });
  }

  createRoom(room: Room): Observable<any> {
    return this.http.post(this.baseUrl, room).map(res => {
      return res['data'] as Room;
    });
  }

  deleteRoom(id: string) {
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.http.delete(deleteUrl).map(res => {
      return res;
    });
  }

  // Default Error handling method
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
