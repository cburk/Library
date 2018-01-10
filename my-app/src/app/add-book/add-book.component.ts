import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// https://angular.io/guide/dynamic-form

import { Library } from '../library'
import { BooksService } from 'app/books.service';
import { Book } from '../book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  // Init value to avoid errors before initialization completes,
  // Also makes sense if library not found
  library: Library = Library.InvalidLibrary;
  book: Book = Book.EmptyBook;
  form: FormGroup;
  error: String;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private bookService: BooksService) { }

  ngOnInit() {
    // Initialize data objects needed
    var libId = this.route.snapshot.params['libraryId'];
    this.bookService.getLibraryById(libId).subscribe(library => {
      this.library = library;
      this.book = this.initNewBookForUser();
    })
  }

  initNewBookForUser(): Book {
    return new Book(
      "",
      "",
      "",
      "",
      this.library.id,
      "SampleUser", // TODO: Eventually get this from login
      true
    )
  }

  verifyAndAdd()
  {
    this.error = "";
    if(this.book.author == ""){
      this.error = "Error: needs an author"
    }
    if(this.book.title == ""){
      this.error = "Error: needs an title"
    }
    if(this.book.author == ""){
      this.error = "Error: needs an author"
    }

    if(this.error.length == 0){
      this.bookService.createBook(this.book).subscribe(res => {
        console.log("Create book req sent, res: " + res)
        this.error = res.Response;
      });
    }
  }
}
