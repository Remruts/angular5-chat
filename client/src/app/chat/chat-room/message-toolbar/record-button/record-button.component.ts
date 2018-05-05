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

    constructor(private sockser: SocketService, private internalService: InternalService) {
    }

    ngOnInit() {
        // navigator.mediaDevices.getUserMedia({ audio: true, video: false})
        //   .then((stream) => {
        //     this.mediaRecorder = new MediaRecorder(stream);
        //   })
        //   .catch(function(err) {
        //     console.log("No tenés para grabar audio :(");
        //     console.log(err.message);
        //   });
    }

    record(){
        this.mediaRecorder.start();
        console.log(this.mediaRecorder.state);
        console.log("recorder started");

        this.chunks = [];

        this.mediaRecorder.ondataavailable = (e) => {
          this.chunks.push(e.data);
        }
    }

    stop(){
        this.mediaRecorder.stop();
        console.log(this.mediaRecorder.state);
        console.log("recorder stopped");
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

                // FIXME: hack para saber si es un User. Buscar otra forma
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
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = fileName;

        //Cast to a File() type
        return <File>theBlob;
    }

}
