import { Component, OnInit} from '@angular/core';
import {SocketService} from '../socket.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    constructor(private sockser: SocketService) { }

    ngOnInit() {
        // Esto anda sólo cuando está hardcodeado. Cuando agreguemos el login posta, va a haber que hacer otra función y llamarla
        this.sockser.initSocket();
        this.sockser.login({nick:'Marto', age:24, city:'Buenos Aires'});
    }

}
