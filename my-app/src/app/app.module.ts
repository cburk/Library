import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksService } from './books.service';
import { UserService } from './user.service';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books/books.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { LibraryComponent } from './library/library.component';
import { AddBookComponent } from './add-book/add-book.component'
import { AdminComponent } from './admin/admin.component'

import { AppRoutingModule } from './app-routing/app-routing.module'

@NgModule({
  // Things the module needs that I write
  declarations: [
    AppComponent,
    BooksComponent,
    BookComponent,
    LibrariesComponent,
    LibraryComponent,
    // To add/remove libs and items from them
    AdminComponent,
    AddBookComponent,
  ],
  // Things that are built in that the module needs
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  // Providers are used for dependency injection.  Services go here
  providers: [BooksService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
