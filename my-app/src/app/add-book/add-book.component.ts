import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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

  constructor(private route: ActivatedRoute,
    private location: Location,
    private bookService: BooksService) { }

  ngOnInit() {
    var libId = this.route.snapshot.params['libraryId'];
    console.log("found id: " + libId);

    this.bookService.getLibraryById(libId).subscribe(library => {
      this.library = library;
    })
  }

}
