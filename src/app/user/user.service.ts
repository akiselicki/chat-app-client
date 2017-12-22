import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class UserService {

  constructor(private localStorageService: LocalStorageService) { }

  setUsername(username: string) {
    this.localStorageService.store('username', username);
  }

  getUsername() {
    return this.localStorageService.retrieve('username');
  }

  logout() {
    this.localStorageService.clear();
  }

}
