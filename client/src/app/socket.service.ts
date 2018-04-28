import { Injectable } from '@angular/core';
import { Message } from './models/message';
import { UserData } from './models/user-data';
import { User } from './models/user';
import { Group } from './models/group';
import { ChatLists } from './models/chat-lists';

import {Observable} from 'rxjs/Observable';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:1337';

@Injectable()
export class SocketService {
	
	private socket;

	public initSocket(){
		this.socket = socketIo(SERVER_URL);
	}

	public login(newUserData: UserData): Observable<User>{
		return new Observable<User>( observer => {
			this.socket.emit('login', newUserData, 
			(user) => observer.next(user));
		});
	}

	public sendMessage(msg: Message){
		this.socket.emit('sendMessage', msg);
	}

	public onMessageReceive(): Observable<Message>{
		return new Observable<Message>( observer => {
			this.socket.on('receiveMessage', (msg) => {
				observer.next(msg);
			});
		});
	}

	public createGroup(groupName: string){
		this.socket.emit('createGroup', groupName);
	}

	public joinGroup(groupid: string){
		this.socket.emit('joinGroup', groupid);	
	}

	public onUpdateChatLists(): Observable<ChatLists>{
		return new Observable<ChatLists> ( observer => {
			this.socket.on('updateChatLists', (newChatLists) =>{
				observer.next(newChatLists);
			});
		});
	}

}
