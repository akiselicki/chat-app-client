import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Message } from './message.model';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class MessageService {
    private apiUrl = `${environment.serverUrl}/api`;
    private limit = environment.pageSize;

    constructor(private http: HttpClient) { }

    getMessages(roomId: string, page: number): Observable<Message[]> {
        return this.http.get(`${this.apiUrl}/rooms/${roomId}/messages?page=${page}&limit=${this.limit}`).map(res => {
            return res['data'] as any;
        });
    }

    postMessage(message: Message, roomId: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/rooms/${roomId}/messages`, message).map(res => {
            return res['data'] as Message;
        });
    }

    // Default Error handling method
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
