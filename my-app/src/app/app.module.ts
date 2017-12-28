import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { LibrariesComponent } from './libraries/libraries.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    LibrariesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
