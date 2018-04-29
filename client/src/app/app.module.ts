import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { SocketService } from './socket.service';
import { Supercooltestingcomponent302vComponent } from './supercooltestingcomponent302v/supercooltestingcomponent302v.component';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    Supercooltestingcomponent302vComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
