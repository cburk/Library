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
  private baseUrl: string = "http://localhost:8080";
  private librariesUrl: string = this.baseUrl + "/Libraries";
  private booksUrl: string = this.baseUrl + "/BookList";
  // Posts send json, need to set access allowed so CORS filters don't block reqs
  private headers: HttpHeaders = new HttpHeaders()

  constructor(private httpCli: HttpClient) { }

  // Only retreived once on load, to smooth transitions
  // and b/c contents would only change infrequently
  private libraries: Library[] = [];

  private initializeLibrariesIfUninitialized(): Observable<Library[]>{
    if(this.libraries.length == 0) {
      console.log("Libraries list is uninitialized, initializing...");

      // Get list of all libraries w/ their data
      return new Observable(observer => {
        this.httpCli.get<Library[]>(this.librariesUrl, {headers: this.headers}).subscribe(res => {
          console.log("Web request for libraries returned the following: ");
          console.log(res);
          var librariesResponse = res;

          this.httpCli.get<Book[]>(this.booksUrl, {headers: this.headers}).subscribe(books => {
            console.log("Web request for books returned the following:")
            console.log(books);

            books.forEach(book => {
              // Find the library this book is stored in
              var matchingLib = librariesResponse.find(lib => lib.id == book.libraryId)
              // If not in a library, ignore it
              if(matchingLib != null){
                // Otherwise, put it in the correct library
                matchingLib.contents.push(book);
                console.log("added book, lib now: ")
                console.log(librariesResponse)
              }
            })

            // Store the response so that we don't have to make a web request every time
            this.libraries = librariesResponse;
            // Asynchronously returning values
            observer.next(librariesResponse);
            observer.complete();
          });
      })
    })
    }else{
      console.log("In else")
      return of(this.libraries);
    }
  }

  // curl localhost:8080/Libraries
  getAllLibraries(): Observable<Library[]>
  {
    console.log("getAllLibraries called");
    return this.initializeLibrariesIfUninitialized();
  }

  getLibraryById(id: string): Observable<Library>{
    console.log("getLibraryById called");
    this.initializeLibrariesIfUninitialized();

    var matchingLibs = this.libraries.filter(lib => lib.id == id);

    if(matchingLibs.length != 0){
      return of(matchingLibs[0]);
    }
    // If no such library exists
    return of(Library.InvalidLibrary);
  }
}
