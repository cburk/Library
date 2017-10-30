import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BookComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ BookComponent ],
  bootstrap:    [ BookComponent ]
})

export class AppModule { }