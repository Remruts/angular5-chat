import { Component, OnInit} from '@angular/core';
import {SocketService} from '../socket.service';


@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	constructor(private sockser: SocketService) { }

	ngOnInit() {
		this.sockser.initSocket();
	}

}
