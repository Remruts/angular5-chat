import { Component, OnInit, Input } from '@angular/core';
import {User} from '../../../../models/user';
import {Group} from '../../../../models/group';

import {SocketService} from '../../../../socket.service';
import {InternalService} from '../../../../internal.service';

declare var MediaRecorder: any;
@Component({
	selector: 'app-record-button',
	templateUrl: './record-button.component.html',
	styleUrls: ['./record-button.component.css']
})
export class RecordButtonComponent implements OnInit {

	@Input() currentChat: User | Group;
	private mediaRecorder;
	private audioURL = "";
	private chunks = [];
	private canRecord = false;

	constructor(private sockser: SocketService, private internalService: InternalService) {
	}

	ngOnInit() {
	}

	record(){
		if (this.canRecord){
			this.mediaRecorder.start();
			console.log("Recording...");

			this.chunks = [];

			this.mediaRecorder.ondataavailable = (e) => {
				this.chunks.push(e.data);
			}
		} else {
			navigator.mediaDevices.getUserMedia({ audio: true, video: false})
			.then((stream) => {
				this.mediaRecorder = new MediaRecorder(stream);
				this.canRecord = true;
			})
			.catch(function(err) {
				console.log("No tenés para grabar audio :(");
				console.log(err.message);
			});
		}
	}

	stop(){
		this.mediaRecorder.stop();
		console.log(this.mediaRecorder.state);

		this.mediaRecorder.onstop = (e) => {
			var blob = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
			this.chunks = [];
			let file = this.blobToFile(blob, "archivo");

			let reader = new FileReader();
			console.log("Loading file...");

			reader.onerror = err => {console.log("Error: failed to load file "+ err)};
			reader.onabort = err => {console.log("Loading aborted " + err)};
			reader.onload = () => {
				console.log("Sending file!");
				let msg = {
					senderid: this.sockser.getMyUser().id,
					senderNick: this.sockser.getMyUser().nick,
					receiverid: this.currentChat.id,
					content: reader.result,
					type: "audio"
				}
				this.sockser.sendMessage(msg);

				// Si es un chat privado, el mensaje se agrega manualmente
				if ('nick' in this.currentChat && (this.sockser.getMyUser().id != this.currentChat.id)){
					this.internalService.addMessage(msg);
				}
			};
			reader.onloadend = () => {console.log("File loaded!")};

			reader.readAsDataURL(file);
		}
	}

	blobToFile(theBlob: Blob, fileName:string): File {
		var b: any = theBlob;
		// Un Blob es casi un File, pero se le agregan estas dos propiedades
		b.lastModifiedDate = new Date();
		b.name = fileName;

		//Cast a tipo File
		return <File>theBlob;
	}

}
