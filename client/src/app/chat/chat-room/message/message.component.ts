import { Component, OnInit, Input } from '@angular/core';
import {Message} from '../../../models/message'

@Component({
	selector: 'app-message',
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

	@Input() mensaje: Message;
	@Input() esMio: boolean;

	constructor() { }

	ngOnInit() {
	}
}
