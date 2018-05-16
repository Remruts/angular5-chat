import { Component, OnInit } from '@angular/core';
import {InternalService} from '../../internal.service';
import {User} from '../../models/user';
import {Group} from '../../models/group';

@Component({
	selector: 'app-chat-room',
	templateUrl: './chat-room.component.html',
	styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

	private currentChat: User | Group;

	constructor(private internalService: InternalService) { }

	ngOnInit() {
		this.internalService.onChatChange()
			.subscribe((userOrGroup) => this.currentChat = userOrGroup);
	}
}
