import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../../socket.service';
import {User} from '../../../models/user';
import {Group} from '../../../models/group';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

    constructor(private sockser: SocketService) { }
    private users: User[];
    private groups: Group[];

    private currentTab = "users";

    ngOnInit() {
        this.sockser.onLoginReady()
            .subscribe((loginmsg) => {
                this.sockser.onUpdateChatLists()
                    .subscribe((chatlist => {
                        this.users = chatlist.users;
                        this.groups = chatlist.groups;
                    }))
            });
    }


}
