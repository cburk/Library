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

  getAllLibraries(): Observable<Library[]>
  {
    console.log("in service");
    return of(LIBRARIES);
  }

  getBooksForLibrary(libraryName: string): Observable<Book[]>
  {
    return of(BOOKS);
  }
}
