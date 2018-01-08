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
  library: Library = Library.InvalidLibrary; // TODO: Make this a placeholder library maybe? Don't display if it's null?
  libId: string;

  initLibrary()
  {
    // Get this lib's name/id
    // use + to convert to int
    this.libId = this.route.snapshot.params['name'];
    console.log("found id: " + this.libId);

    this.bs.getLibraryById(this.libId)
      .subscribe(lib => {
        if(lib == Library.InvalidLibrary){
          console.log("Library not found!  Should redir to 404");
        }
        this.library = lib;
      });
  }

  constructor(private bs: BooksService,
              private route: ActivatedRoute,
              private location: Location
            ) { }

  ngOnInit() {
    this.initLibrary();
  }

}
