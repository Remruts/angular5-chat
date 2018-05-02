import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

import {Message} from './models/message';
import {Group} from './models/group';
import {User} from './models/user';

@Injectable()
export class InternalService {

    private currentChat = new BehaviorSubject<User | Group>({id:"0", name:"Grupo público"});
		private mensajes = new Subject<Message>();
    constructor() { }

    public changeChat(userOrGroup: User | Group){
        this.currentChat.next(userOrGroup);
    }

    public onChatChange(): Observable<User | Group>{
        return this.currentChat.asObservable();
    }

		public addMessage(msj: Message){
			this.mensajes.next(msj)
		}

		public onMessagePushed(): Observable<Message>{
			return this.mensajes.asObservable();
		}

}
