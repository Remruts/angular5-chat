import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../../socket.service';
import {InternalService} from '../../../internal.service';
import {Message} from '../../../models/message';

@Component({
  selector: 'app-message-toolbar',
  templateUrl: './message-toolbar.component.html',
  styleUrls: ['./message-toolbar.component.css']
})
export class MessageToolbarComponent implements OnInit {

    private mensaje: string;
    private currentChat: string;

    constructor(private sockser: SocketService, private internalService: InternalService) { }

    ngOnInit() {
        this.internalService.onChatChange()
            .subscribe((userOrGroup) => this.currentChat = userOrGroup.id);
    }

    sendMessage(){
        if (this.mensaje != ""){
            let msg = {
                senderid: this.sockser.getMyUser().id,
                senderNick: this.sockser.getMyUser().nick,
                receiverid: this.currentChat,
                type: "text",
                content: this.mensaje
            }
            this.sockser.sendMessage(msg);
            this.mensaje = "";
        }

    }

}
