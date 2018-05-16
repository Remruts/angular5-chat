import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeURL'})

export class SafeURLPipe {
	constructor(private sanitizer:DomSanitizer){}

	transform(url) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}
