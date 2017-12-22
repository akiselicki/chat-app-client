import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { Ng2Webstorage } from 'ngx-webstorage';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { MaterialModule } from './material.module';

import { HomeComponent } from './home/index';
import { ChatComponent } from './chat/index';

import { UserService } from './user/index';
import { RoomService } from './room/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToasterModule,
    Ng2Webstorage,
    InfiniteScrollModule,
    routing,
    MaterialModule
  ],
  providers: [
    ToasterService,
    UserService,
    RoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
