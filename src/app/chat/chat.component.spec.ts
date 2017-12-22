import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../material.module';
import { LocalStorageService } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChatComponent } from './chat.component';
import { UserService } from '../user/index';
import { RoomService } from '../room/index';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let localStorageService: LocalStorageService;
  let userService: UserService;
  let roomService: RoomService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ToasterModule,
        InfiniteScrollModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ ChatComponent ],
      providers: [
        LocalStorageService,
        UserService,
        RoomService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;

    localStorageService = TestBed.get(LocalStorageService);
    userService = TestBed.get(UserService);
    roomService = TestBed.get(RoomService);

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
