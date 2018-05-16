import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../../socket.service';
import {InternalService} from '../../../internal.service';

@Component({
	selector: 'app-new-group',
	templateUrl: './new-group.component.html',
	styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

	private modal;
	private name: string;

	constructor(private sockser: SocketService, private internalService: InternalService) { }

	ngOnInit() {
		this.modal = document.getElementById('groupModal');
	}

	showModal(){
		this.modal.style.display = "block";
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
