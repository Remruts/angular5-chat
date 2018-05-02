import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service'
import { User } from '../models/user';
import { Group } from '../models/group';
import { Message } from '../models/message';
import { UserData } from '../models/user-data';
import { ChatLists } from '../models/chat-lists';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-supercooltestingcomponent302v',
  templateUrl: './supercooltestingcomponent302v.component.html',
  styleUrls: ['./supercooltestingcomponent302v.component.css']
})
export class Supercooltestingcomponent302vComponent implements OnInit {

	private miUser: User;
	private mensajes: Message[] = [];
	private grupos: Group[];
	private users: User[];
	private grupoActual: Group;

	constructor(private socketService: SocketService) { }

	ngOnInit() {
		this.socketService.initSocket();
		this.onUpdate();
		this.onMessage();
	}

	login(){
		let newUserData = {nick: "Marto",
		age: 24,
		city: "Buenos Aires"};

		this.miUser = this.socketService.login(newUserData);

	};

	sendMessage(){
		let msg = {	senderid:this.miUser.id,
		receiverid: '0',
		content:'andy andy andy andyyyY!',
		type: 'text'
		}
		this.socketService.sendMessage(msg);
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
				let msg = {	senderid:this.miUser.id,
					receiverid: '0',
					content: reader.result,
					type: type
				}
				this.socketService.sendMessage(msg);
			};
			reader.onloadend = () => {console.log("File loaded!")};

			reader.readAsDataURL(file);

		} else {
			console.log("No file selected");
		}

	}

	sendGroupMessage(){
		if (this.grupos[1]){
			let msg = {	senderid:this.miUser.id,
			receiverid: this.grupos[1].id,
			content:'Este es un mensaje de prueba',
			type: 'text'
			}
			this.socketService.sendMessage(msg);
		}
	}

	createGroup(){
		this.socketService.createGroup("Los Salieris de Dijkstra")
			.subscribe((grupo) => this.grupoActual = grupo);
	}

	joinGroup(){
		if (this.grupos[1]){
			this.socketService.joinGroup(this.grupos[1].id);
		}
	}

	onMessage(){
		this.socketService.onMessageReceive()
			.subscribe((msg) => this.mensajes.push(msg));
	}

	onUpdate(){
		this.socketService.onUpdateChatLists()
			.subscribe((chtlst) => {
				this.grupos = chtlst.groups;
				this.users = Object.values(chtlst.users);
			})
	}

}
