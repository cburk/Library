import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    // Get this lib's name/id
    // use + to convert to int
    this.libId = this.route.snapshot.params['name'];
    console.log("found id: " + this.libId);

    // Sample text for individual lib
    this.bs.getLibraryById(this.libId)
      .subscribe(lib => {
        if(lib == null){
          console.log("Library not found!  Should redir to 404");
        }
        this.library = lib;
      });
  }

  // TODO: library id
  constructor(private bs: BooksService,
              private route: ActivatedRoute,
              private location: Location
            ) { }

  // TODO: library id
  ngOnInit() {
    this.initLibrary();
  }

}
