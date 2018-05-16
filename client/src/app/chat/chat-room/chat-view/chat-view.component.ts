import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {SocketService} from '../../../socket.service';
import {InternalService} from '../../../internal.service';

import {Message} from '../../../models/message';
import {User} from '../../../models/user';
import {Group} from '../../../models/group';

@Component({
	selector: 'app-chat-view',
	templateUrl: './chat-view.component.html',
	styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {

	private mensajes: {[id: string]: Message[]} = {};
	private myUserID = "";

	@Input() currentChat: User | Group;
	@ViewChild('scrollable') private myScrollContainer: ElementRef;

	constructor(private sockser: SocketService, private internalService: InternalService) { }

	ngOnInit() {
		this.sockser.onLoginReady()
			.subscribe((loginmsg) => {
				this.myUserID = this.sockser.getMyUser().id;

				this.sockser.onMessageReceive()
					.subscribe((msg) => this.pushMessage(msg));
				this.internalService.onMessagePushed()
					.subscribe((msg) => this.pushMessage(msg));
		})
	}

	ngAfterViewChecked() {
		this.scrollToBottom();
	}

	pushMessage(msg: Message){
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
	}

	scrollToBottom(){
		this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
	}
}
