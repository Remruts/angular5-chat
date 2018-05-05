import { Component, OnInit } from '@angular/core';
import {InternalService} from '../../../internal.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-chat-sorting',
  templateUrl: './chat-sorting.component.html',
  styleUrls: ['./chat-sorting.component.css']
})
export class ChatSortingComponent implements OnInit {

  constructor(private internalService: InternalService) { }

  ngOnInit() {
  }

  Sort(caso: string){
      let f : (a:User, b:User) => number
      switch(caso){
        case 'alfabetico':
            f = (a:User, b:User) => a.nick.toLowerCase() > b.nick.toLowerCase() ? 1 : -1;
        break;
        case 'ciudad':
            f = (a:User, b:User) => a.city.toLowerCase() > b.city.toLowerCase() ? 1 : -1;
        break;
        case 'edad':
            f = (a:User, b:User) => a.age > b.age ? 1 : -1;
        break;

      }

      this.internalService.changeSort(f);
  }

}
