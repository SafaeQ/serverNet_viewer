import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServerListComponent } from './server-list/server-list.component';
import { ServerDetailsComponent } from './server-details/server-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerListComponent,
    ServerDetailsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
