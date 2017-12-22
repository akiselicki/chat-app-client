import { TestBed, inject } from '@angular/core/testing';
import { LocalStorageService } from 'ngx-webstorage';

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        UserService
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should store username and retrieve it from local storage', inject([UserService], (service: UserService) => {
    service.setUsername('test');
    expect(service.getUsername()).toBe('test');
  }));

  it('should clear local storage', inject([UserService], (service: UserService) => {
    service.logout();
    expect(service.getUsername()).toBeNull();
  }));

  afterAll(inject([UserService], (service: UserService) => {
    service.logout();
  }));
});
