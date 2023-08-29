import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ServerListComponent } from './server-list/server-list.component';
import { ServerDetailsComponent } from './server-details/server-details.component';
import { FormsModule } from '@angular/forms';
import { ServerService } from './services/server.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent, ServerListComponent, ServerDetailsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
