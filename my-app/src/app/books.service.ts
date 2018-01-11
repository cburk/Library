import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/filter';

import { Library } from './library';
import { Book } from './book';
import { HttpResponse } from '@angular/common/http/src/response';

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
  /*
   *  Library actions (get, get:id, put)
   */
  getAllLibraries(): Observable<Library[]>
  {
    console.log("getAllLibraries called");
    return this.initializeLibrariesIfUninitialized();
  }

  getLibraryById(id: string): Observable<Library>{
    console.log("getLibraryById called");
  
    return new Observable(observer => {
      this.initializeLibrariesIfUninitialized().subscribe(libs => {
        console.log("In here")
        var matches = this.libraries.find(lib => lib.id == id)
        console.log("matches")
        console.log(matches)
        observer.next(matches != undefined ? matches : Library.InvalidLibrary)
        observer.complete()
      })
    })
  }

  // TODO: Really need an option to get library always from server.  
  // Library component should poll every 10 seconds or something like that

  // Locking/unlocking should return {"Response":"Locked/Unlocked successfully"}
  lockLibrary(id: string): Observable<string>{
    return this.httpCli.put<string>(this.librariesUrl + '/' + id + '/Lock', "");
  }
  unlockLibrary(id: string): Observable<string>{
    return this.httpCli.put<string>(this.librariesUrl + '/' + id + '/Unlock', "");
  }

  // Returns detailed error message or ok
  createLibrary(library: Library): Observable<any>{
    // Service should maintain the local copy for efficiency reasons
    this.libraries.push(library)

    // TODO maybe? Pull validation out into here, and then either an error is returned locally or the 
    // web error is returned
    return this.httpCli.post<string>(this.librariesUrl, library, {headers: this.headers})
  }



  /*
   * Book actions (get, create, etc)
   */
  // Returns detailed error message or ok
  createBook(book: Book): Observable<any>{
    // Service should maintain the local copy for efficiency reasons
    this.getLibraryById(book.libraryId).subscribe(lib => {
      lib.contents.push(book)
    })

    return this.httpCli.post<string>(this.baseUrl + "/AddBookToLibrary", 
      book
    );
  }
}
