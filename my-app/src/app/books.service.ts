import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Library } from './library';
import { Book } from './book';

// Mocks, to be replaced w/ service calls
import { BOOKS } from './mock-books';
import { LIBRARIES } from './mock-libraries';

@Injectable()
export class BooksService {

  constructor() { }

  // Only retreived once on load, to smooth transitions
  // and b/c contents would only change infrequently
  private libraries: Library[];

  getAllLibraries(): Observable<Library[]>
  {
    console.log("in service");
    if(this.libraries == null || this.libraries.length == 0) {
      console.log("initializing libs list");
      // TODO: web req to backend
      this.libraries = LIBRARIES;
    }
    return of(this.libraries);
  }

  getLibraryById(libraryName: string): Observable<Library>{
    var matchingLibs = this.libraries.filter(lib => lib.name == libraryName);

    if(matchingLibs.length != 0){
      return of(matchingLibs[0]);
    }
    // If no such library exists
    return null;
  }

  getBooksForLibrary(libraryName: string): Observable<Book[]>{
    console.log("WARNING: Not implemented");
    return of(BOOKS);
  }
}
