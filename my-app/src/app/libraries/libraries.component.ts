import { Component, OnInit } from '@angular/core';
import { Library } from '../library'
import { BooksService } from 'app/books.service';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.css']
})
export class LibrariesComponent implements OnInit {
  lockText: string = "Unlock";

  // The master list of all libraries
  allLibraries: Library[];
  // The list of libraries being displayed on the main page
  libraries: Library[];

  // TODO: Can probably break out into own component
  query: string;
  searchForLibrary(query: string) {
    if(query == ""){
      this.libraries = this.allLibraries
    }else{
      this.libraries = this.allLibraries.filter(lib => lib.name == query);
    }
  }

  initializeLibrariesLists()
  {
    this.booksService.getAllLibraries().subscribe(libs => {
      this.allLibraries = libs;
      this.libraries = libs;  
    });
  }

  /*
   Typical angular pattern (as per https://angular.io/tutorial/toh-pt4),
   just use constructor for dependency injection / keeping track
   of passed in parameters, do all real initialization in ngOnInit
   */
  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.initializeLibrariesLists();
  }

}
