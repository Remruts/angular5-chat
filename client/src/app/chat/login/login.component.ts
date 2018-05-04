import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../socket.service';
import {InternalService} from '../../internal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private name: string;
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

    create(){
        this.modal = document.getElementById('groupModal');
        if (this.name != ""){
            this.modal.style.display = "none";
            this.sockser.createGroup(this.name)
                .subscribe((grupo) => this.internalService.changeChat(grupo));
						this.name = "";
        }
    }

    cancel(){
        this.modal = document.getElementById('groupModal');
        this.modal.style.display = "none";
        this.name = "";
    }

}
