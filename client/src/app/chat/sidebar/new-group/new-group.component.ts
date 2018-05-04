import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../../socket.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

    private modal;

    constructor(private sockser: SocketService) { }

    ngOnInit() {
        this.modal = document.getElementById('groupModal');
    }

    showModal(){
        this.modal.style.display = "block";
    }
}
