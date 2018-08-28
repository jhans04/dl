import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module'
import { AppComponent } from './app.component';
import { AddonService } from './addon.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AddonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
