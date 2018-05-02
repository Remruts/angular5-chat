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
import { AddImageButtonComponent } from './chat/chat-room/message-toolbar/add-image-button/add-image-button.component';
import { SendAudioButtonComponent } from './chat/chat-room/message-toolbar/send-audio-button/send-audio-button.component';
import { RecordButtonComponent } from './chat/chat-room/message-toolbar/record-button/record-button.component';
import { SendButtonComponent } from './chat/chat-room/message-toolbar/send-button/send-button.component';

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
    AddImageButtonComponent,
    SendAudioButtonComponent,
    RecordButtonComponent,
    SendButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [SocketService, InternalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
