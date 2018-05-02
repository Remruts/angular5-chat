import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class InternalService {

    private currentChat = new BehaviorSubject<string>("0");

    constructor() { }

    public changeChat(chatId: string){
        this.currentChat.next(chatId);
    }

    public onChatChange(): Observable<string>{
        return this.currentChat.asObservable();
    }

}
