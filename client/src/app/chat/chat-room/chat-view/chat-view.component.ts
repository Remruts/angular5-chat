import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../../socket.service';
import {InternalService} from '../../../internal.service';

import {Message} from '../../../models/message';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {

    private mensajes: {[id: string]: Message[]} = {};
    private myUserID = "";

    private currentChat: string;

    constructor(private sockser: SocketService, private internalService: InternalService) { }

    ngOnInit() {
        this.sockser.onLoginReady()
            .subscribe((loginmsg) => {
                this.myUserID = this.sockser.getMyUser().id;

                this.sockser.onMessageReceive()
                    .subscribe((msg) => {
                        console.log(msg);
                        if (this.myUserID == msg.receiverid){
                            if (!this.mensajes[msg.senderid]){
                                this.mensajes[msg.senderid] = [];
                            }
                            this.mensajes[msg.senderid].push(msg);
                        } else{
                            if (!this.mensajes[msg.receiverid]){
                                this.mensajes[msg.receiverid] = [];
                            }
                            this.mensajes[msg.receiverid].push(msg);
                        }
                    })
                console.log(loginmsg);
                this.internalService.onChatChange()
                    .subscribe((userOrGroup) => this.currentChat = userOrGroup.id);
            })

    }
}
