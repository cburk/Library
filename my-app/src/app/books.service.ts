import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Library } from './library';
import { Book } from './book';

// Mocks, to be replaced w/ service calls
import { BOOKS } from './mock-books';
import { LIBRARIES } from './mock-libraries';

// TODO: Maybe refactor into separate books and library services, w/
// the latter using the former
@Injectable()
export class BooksService {

  constructor() { }

  // Only retreived once on load, to smooth transitions
  // and b/c contents would only change infrequently
  private libraries: Library[];

  private initializeLibrariesIfUninitialized(){
    if(this.libraries == null) {
      console.log("Libraries list is uninitialized, initializing...");
      // TODO: web req to backend
      this.libraries = LIBRARIES;
    }
  }

  getAllLibraries(): Observable<Library[]>
  {
    console.log("getAllLibraries called");
    this.initializeLibrariesIfUninitialized();
    
    return of(this.libraries);
  }

  getLibraryById(libraryName: string): Observable<Library>{
    console.log("getLibraryById called");
    this.initializeLibrariesIfUninitialized();

    var matchingLibs = this.libraries.filter(lib => lib.name == libraryName);

    if(matchingLibs.length != 0){
      return of(matchingLibs[0]);
    }
    // If no such library exists
    return of(Library.InvalidLibrary);
  }
}
