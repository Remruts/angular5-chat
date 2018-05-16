import { Component, OnInit, Input } from '@angular/core';
import {SocketService} from '../../../socket.service';
import {InternalService} from '../../../internal.service';

import {Message} from '../../../models/message';
import {User} from '../../../models/user';
import {Group} from '../../../models/group';

@Component({
	selector: 'app-message-toolbar',
	templateUrl: './message-toolbar.component.html',
	styleUrls: ['./message-toolbar.component.css']
})
export class MessageToolbarComponent implements OnInit {

	private mensaje: string;
	@Input() currentChat: User | Group;

	constructor(private sockser: SocketService, private internalService: InternalService) { }

	ngOnInit() {
	}

	sendMessage(){
		if (this.mensaje != ""){
			let msg = {
				senderid: this.sockser.getMyUser().id,
				senderNick: this.sockser.getMyUser().nick,
				receiverid: this.currentChat.id,
				type: "text",
				content: this.mensaje
			}

			this.sockser.sendMessage(msg);
			// Si es un chat privado, es necesario agregar el mensaje manualmente
			if ('nick' in this.currentChat && (this.sockser.getMyUser().id != this.currentChat.id)){
				this.internalService.addMessage(msg);
			}

			// Borrar el mensaje actual de la toolbar
			this.mensaje = "";
		}
	}

}
