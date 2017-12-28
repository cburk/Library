import { Component, OnInit } from '@angular/core';
import { Library } from '../library';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})

/*
Represents the page/detailed view for a specific library
*/
export class LibraryComponent implements OnInit {
  library: Library;
  libId: string = "SAMPLE LIB NAME";

  initLibrary()
  {
    // Sample text for individual lib
    this.bs.getBooksForLibrary(this.libId)
      .subscribe(books => {
        this.library = new Library(this.libId, "SAMPLE LOC REPLACE", true, books);
      });
  }

  // TODO: library id
  constructor(private bs: BooksService) { }

  // TODO: library id
  ngOnInit() {
    this.initLibrary();
  }

}
