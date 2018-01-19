import { Component, OnInit } from '@angular/core';
import { Library } from '../library'
import { BooksService } from 'app/books.service';
import { ResponseJSON } from 'app/responseJSON';

@Component({
  selector: 'app-add-library',
  templateUrl: './add-library.component.html',
  styleUrls: ['./add-library.component.css']
})
export class AddLibraryComponent implements OnInit {

  private libraryName: string = ""
  private libraryLocation: string = ""
  error: String = ""

  constructor(private bookService: BooksService) { }

  ngOnInit() {
    this.libraryName = ""
    this.libraryLocation = ""
    this.error = ""
  }

  createLibrary(){
    var newLibrary: Library = new Library(this.libraryName, this.libraryLocation)

    this.bookService.createLibrary(newLibrary).subscribe(res => {
      if(!this.bookService.validLibCreateResponse(res)){
        this.error = "Error: " + res.Response
        this.libraryName = ""
        this.libraryLocation = ""    
      }else{
        this.error = "Created successfully!"
      }
    })
  }

  /*
    constructor(name: string, loc: string, locked: boolean = true, contents: Book[]) {
        this.name = name;
        this.location = loc;
        this.isLocked = locked;
        this.lockButtonText = "";
        this.contents = contents;
    }
  */
}
