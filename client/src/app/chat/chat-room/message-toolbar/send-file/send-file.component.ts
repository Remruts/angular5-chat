import { Component, OnInit, Input } from '@angular/core';
import {SocketService} from '../../../../socket.service';
import {InternalService} from '../../../../internal.service';

import {User} from '../../../../models/user';
import {Group} from '../../../../models/group';

@Component({
	selector: 'app-send-file',
	templateUrl: './send-file.component.html',
	styleUrls: ['./send-file.component.css']
})
export class SendFileComponent implements OnInit {

	constructor(private sockser: SocketService, private internalService: InternalService) { }

	@Input() currentChat: User | Group;

	ngOnInit() {
	}

	sendFile(files){
		let file = files.item(0);
		if (file){
			let type = file.type.substr(0, file.type.indexOf('/'));

			let reader = new FileReader();
			console.log("Loading file...");

			reader.onerror = err => {console.log("Error: failed to load file "+ err)};
			reader.onabort = err => {console.log("Loading aborted " + err)};
			reader.onload = () => {
				console.log("Sending file!");
				let msg = {	senderid: this.sockser.getMyUser().id,
					senderNick: this.sockser.getMyUser().nick,
					receiverid: this.currentChat.id,
					content: reader.result,
					type: type
				}
				this.sockser.sendMessage(msg);

				// Si es un chat privado, el mensaje se agrega manualmente
				if ('nick' in this.currentChat && (this.sockser.getMyUser().id != this.currentChat.id)){
					this.internalService.addMessage(msg);
				}
			};
			reader.onloadend = () => {console.log("File loaded!")};

			reader.readAsDataURL(file);

		} else {
			console.log("No file selected");
		}
	}

}
