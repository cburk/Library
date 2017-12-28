import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BooksService } from './books.service';

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
    FormsModule,
  ],
  // Providers are used for dependency injection.  Services go here
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
