import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {Group} from './models/group';
import {User} from './models/user';

@Injectable()
export class InternalService {

    private currentChat = new BehaviorSubject<User | Group>({id:"0"});

    constructor() { }

    public changeChat(userOrGroup: User | Group){
        this.currentChat.next(userOrGroup);
    }

    public onChatChange(): Observable<User | Group>{
        return this.currentChat.asObservable();
    }

}
