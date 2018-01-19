import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/filter';

import { Library } from './library';
import { Book } from './book';
import { HttpResponse } from '@angular/common/http/src/response';
import { UserService } from 'app/user.service';
import { ResponseJSON } from 'app/responseJSON';
import { forEach } from '@angular/router/src/utils/collection';
import { resetFakeAsyncZone } from '@angular/core/testing';

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
  lockLibrary(id: string): Observable<ResponseJSON>{
    return new Observable<ResponseJSON>(observer => {
      this.httpCli.put<ResponseJSON>(this.librariesUrl + '/' + id + '/Lock', "").subscribe(res => {

        if(this.validLockUnlockResponse(res)){
          // If the response is good, register the local copy as locked
          console.log("Now locked") 
          this.getLibraryById(id).subscribe(library => {
            library.isLocked = !library.isLocked;
          })
        }else{
          console.log("Lock failed!")
        }

        observer.next(res)
        observer.complete()
      })
    })
  }

  unlockLibrary(id: string): Observable<ResponseJSON>{
    return new Observable<ResponseJSON>(observer => {
      this.httpCli.put<ResponseJSON>(this.librariesUrl + '/' + id + '/Unlock', "").subscribe(res => {

        if(this.validLockUnlockResponse(res)){
          // If the response is good, register the local copy as unlocked
          console.log("Now unlocked" + res) 
          this.getLibraryById(id).subscribe(library => {
            library.isLocked = !library.isLocked;
          })
        }else{
          console.log("Unlock failed!")
        }

        observer.next(res)
        observer.complete()
      })
    }) 
  }

  // Returns detailed error message or ok
  createLibrary(library: Library): Observable<ResponseJSON>{
    return new Observable<ResponseJSON>(observer => {
      this.httpCli.post<ResponseJSON>(this.librariesUrl, library, {headers: this.headers}).subscribe(res => {
        if(this.validLibCreateResponse(res)){
          console.log("Created successfully")
          // Service should maintain the local copy for efficiency reasons
          library.id = res.Response
          this.libraries.push(library)
        }else{
          console.log("library not created")
        }
        
        observer.next(res)
        observer.complete()
      })
    })
  }

  /*
   * Book actions (get, create, etc)
   */
  // Creates a book and adds it to the library specified by book.LibraryId
  createBook(book: Book): Observable<any>{
    return new Observable<ResponseJSON>(observer => {
      this.httpCli.post<ResponseJSON>(this.baseUrl + "/AddBookToLibrary", 
        book
      ).subscribe(res => {
        if(this.validBookCreateResponse(res)){
          console.log("Created successfully")
          // Service should maintain the local copy for efficiency reasons
          this.getLibraryById(book.libraryId).subscribe(lib => {
            lib.contents.push(book)
          })
        }else{
          console.log("library not created")
        }
        
        observer.next(res)
        observer.complete()
      });
    })
  }

  // Gets a book by id.  From local copy if initialized.
  getBookById(bookId: string): Book{
    this.initializeLibrariesIfUninitialized();

    this.libraries.forEach(library => {
      var matchingBook = library.contents.find(book => book.bookId == bookId)
      if(matchingBook != undefined){
        return matchingBook
      }
    })

    // If none match, return empty
    return Book.EmptyBook
  }

  // TODO: Username will probably eventually be done via sessions/login server side
  checkoutBook(bookId: string): Observable<ResponseJSON>{
    console.log("In checkout service call")
    return new Observable<ResponseJSON>(observer => {
      this.httpCli.put<ResponseJSON>(this.baseUrl + "/CheckOut", 
        {BookId: bookId} // Username set via session/login check on backend
      ).subscribe(res => {
        // If it was a good response, note locally
        if(this.validCheckoutResponse(res)){
          console.log("Checkout successful")
          this.getBookById(bookId).available = false
        }else{
          console.log("Checkout unsuccessful")
        }
        // Return the error or ok 
        observer.next(res)
        observer.complete()
      });
    })
  }

  returnBook(bookId: string): Observable<ResponseJSON>{
    return new Observable<ResponseJSON>(observer => {
      this.httpCli.put<ResponseJSON>(this.baseUrl + "/CheckIn", 
        {BookId: bookId} // Username set via session/login check on backend
      ).subscribe(res => {
        // If it was a good response, note locally
        if(this.validCheckinResponse(res)){
          console.log("Return successful")
          this.getBookById(bookId).available = true
        }else{
          console.log("Return unsuccessful")
        }
        // Return the error or ok 
        observer.next(res)
        observer.complete()
      });
    })
  }

  /*
  * Response Validators
  */
  validCheckoutResponse(response: ResponseJSON): boolean{
    console.log("Response: " + response.Response)
    return response.Response != "Error: Book not available";
  }
  validCheckinResponse(response: ResponseJSON): boolean{
    console.log("Response from servera: " + response.Response)
    if(response.Response == "Successfully checked out book" || response.Response == "Error: Book not available"){
      return false
    }
    return true
  }

  validBookCreateResponse(response: ResponseJSON): boolean{
    console.log("Response from server: " + response.Response)
    if(response.Response == "Added successfully"){
      return true
    }
    return false
  }

  validLibCreateResponse(response: ResponseJSON): boolean{
    console.log("Response from server: " + response.Response)
    if(response.Response == "Error connecting to db"){
      return false
    }
    return true
  }

  validLockUnlockResponse(response: ResponseJSON): boolean{
    console.log("Response from server: " + response.Response)
    if(response.Response != "Locked/Unlocked successfully"){
      return false
    }
    return true
  }


  validXResponse(response: ResponseJSON): boolean{
    console.log("Response from server: " + response.Response)
    if(response.Response == "Successfully checked out book" || response.Response == "Error: Book not available"){
      return false
    }
    return true
  }
}
