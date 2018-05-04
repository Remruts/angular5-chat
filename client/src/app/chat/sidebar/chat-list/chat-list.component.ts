import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../../socket.service';
import {InternalService} from '../../../internal.service';
import {User} from '../../../models/user';
import {Group} from '../../../models/group';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

    constructor(private sockser: SocketService, private internalService: InternalService) { }
    private users: User[];
    private groups: Group[];
    private sortingFunction: (a:User, b:User) => number;

    private currentTab = "users";

    ngOnInit() {
        this.sockser.onLoginReady()
            .subscribe((loginmsg) => {
                this.internalService.onSortChange()
                    .subscribe((f) => {
                        this.sortingFunction = f;
                        if (this.users)
                            this.users.sort(f);
                    });
                this.sockser.onUpdateChatLists()
                    .subscribe((chatlist => {
                        this.users = chatlist.users;
                        this.groups = chatlist.groups;
                        this.users.sort(this.sortingFunction);
                    }));
            });
    }

    changeTab(tab:string){
        this.currentTab = tab;
    }

    changeChat(userOrGroup){
        if ('name' in userOrGroup){
            this.sockser.joinGroup(userOrGroup.id);
        }
        this.internalService.changeChat(userOrGroup);
    }

}
