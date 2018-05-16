import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';

import { SocketService } from './socket.service';
import {InternalService} from './internal.service';

import { ChatComponent } from './chat/chat.component';
import { SafeURLPipe } from './safe-url.pipe';
import { SidebarComponent } from './chat/sidebar/sidebar.component';
import { ChatListComponent } from './chat/sidebar/chat-list/chat-list.component';
import { ChatListItemComponent } from './chat/sidebar/chat-list-item/chat-list-item.component';
import { ChatSortingComponent } from './chat/sidebar/chat-sorting/chat-sorting.component';
import { ChatRoomComponent } from './chat/chat-room/chat-room.component';
import { ChatViewComponent } from './chat/chat-room/chat-view/chat-view.component';
import { MessageComponent } from './chat/chat-room/message/message.component';
import { MessageToolbarComponent } from './chat/chat-room/message-toolbar/message-toolbar.component';
import { RecordButtonComponent } from './chat/chat-room/message-toolbar/record-button/record-button.component';
import { SendButtonComponent } from './chat/chat-room/message-toolbar/send-button/send-button.component';
import { SendFileComponent } from './chat/chat-room/message-toolbar/send-file/send-file.component';
import { LoginComponent } from './chat/login/login.component';
import { NewGroupComponent } from './chat/sidebar/new-group/new-group.component';

@NgModule({
  declarations: [
    AppComponent,
    SafeURLPipe,
    ChatComponent,
    SidebarComponent,
    ChatListComponent,
    ChatListItemComponent,
    ChatSortingComponent,
    ChatRoomComponent,
    ChatViewComponent,
    MessageComponent,
    MessageToolbarComponent,
    RecordButtonComponent,
    SendButtonComponent,
    SendFileComponent,
    LoginComponent,
    NewGroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [SocketService, InternalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
