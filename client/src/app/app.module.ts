import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { SocketService } from './socket.service';
import { Supercooltestingcomponent302vComponent } from './supercooltestingcomponent302v/supercooltestingcomponent302v.component';
import { SafeURLPipe } from './safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    Supercooltestingcomponent302vComponent,
    SafeURLPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
