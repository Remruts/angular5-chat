import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service'
import { User } from '../models/user';
import { Message } from '../models/message';
import { UserData } from '../models/user-data';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-supercooltestingcomponent302v',
  templateUrl: './supercooltestingcomponent302v.component.html',
  styleUrls: ['./supercooltestingcomponent302v.component.css']
})
export class Supercooltestingcomponent302vComponent implements OnInit {

	private miUser: User;
	private mensajes: Message[] = [];

	constructor(private socketService: SocketService) { }

	ngOnInit() {
		console.log('Funciona');
		this.socketService.initSocket();
		this.onMessage();
	}

	login(){
		let newUserData = {nick: "Marto",
		age: 24,
		city: "Buenos Aires"};

		this.socketService.login(newUserData)
			.subscribe((user) => this.miUser = user);
	};

	sendMessage(){
		let msg = {	senderid:this.miUser.id,
		receiverid: '0',
		content:'andy andy andy andyyyY!',
		type: 'text'
		}
		this.socketService.sendMessage(msg);
	}

	onMessage(){
		this.socketService.onMessageReceive()
			.subscribe((msg) => this.mensajes.push(msg));
	}

}
