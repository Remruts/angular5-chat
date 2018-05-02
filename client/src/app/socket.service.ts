import { Injectable } from '@angular/core';
import { Message } from './models/message';
import { UserData } from './models/user-data';
import { User } from './models/user';
import { Group } from './models/group';
import { ChatLists } from './models/chat-lists';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:1337';

@Injectable()
export class SocketService {

	private socket;
	private myUser;
	private loginFlag = new Subject<string>();

	public initSocket(){
		if (!this.socket){
			this.socket = socketIo(SERVER_URL);
			console.log("Socket inicializado");
			console.log(this.loginFlag);
		}
	}

	public login(newUserData: UserData): User{
		this.socket.emit('login', newUserData,
		(user) => {
			this.myUser = user;
			this.loginFlag.next("login success");
		});
		return this.myUser;

	}

	public getMyUser(): User{
		return this.myUser;
	}

	public onLoginReady(): Subject<string>{
		return this.loginFlag;
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

	public createGroup(groupName: string): Observable<Group>{
		return new Observable<Group>( observer =>{
			this.socket.emit('createGroup', groupName,
				(grupo) => observer.next(grupo));
		});
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
