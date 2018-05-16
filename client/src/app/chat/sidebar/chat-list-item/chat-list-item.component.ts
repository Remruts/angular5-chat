import { Component, OnInit, Input } from '@angular/core';
import { InternalService } from '../../../internal.service';

@Component({
	selector: 'app-chat-list-item',
	templateUrl: './chat-list-item.component.html',
	styleUrls: ['./chat-list-item.component.css']
})
export class ChatListItemComponent implements OnInit {

	@Input() id: string;
	@Input() name: string;
	@Input() age: number;
	@Input() city: string;
	private isCurrent: boolean;

	constructor(private internalService: InternalService) { }

	ngOnInit() {
		this.internalService.onChatChange()
			.subscribe(userOrGroup => {
				this.isCurrent = this.id === userOrGroup.id;
		})
	}

}
