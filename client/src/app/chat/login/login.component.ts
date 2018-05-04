import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../socket.service';
import {InternalService} from '../../internal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private nick: string;
    private age: number;
    private city: string;

    private modal;

    constructor(private sockser: SocketService, private internalService: InternalService) { }

    ngOnInit() {
        this.modal = document.getElementById('myModal');
    }

    login(){
      if (this.nick != "" && this.age && this.city != ""){
          this.modal.style.display = "none";
          this.sockser.login({nick:this.nick, age:this.age, city:this.city});
      }
    }

}
