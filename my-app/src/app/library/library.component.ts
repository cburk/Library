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

        // Update the display info for the lock button
        //this.setLockButtonText();
      });
  }

  lockButtonText(): string{
    if(!this.library.isLocked)
      return "Unlocked!";
    else
      return "Unlock Button";
  }

  toggleLock() {
    console.log("Lock/Unlock button clicked, was: " + this.library.isLocked);

    // Make request from api
    var requestObservable;
    if(this.library.isLocked){
      requestObservable = this.bs.unlockLibrary(this.library.id)
    }else{
      requestObservable = this.bs.lockLibrary(this.library.id);
    }

    requestObservable.subscribe((res) => {
      console.log(res)
      console.log(res.Response)
  
      // Request is valid, update local copies
      if(res.Response == "Locked/Unlocked successfully"){
        console.log("REST service responded w/ ok, was locked: " + this.library.isLocked)
        this.library.isLocked = !this.library.isLocked;
        console.log("Now locked: " + this.library.isLocked)
      }
    })  
  }

  constructor(private bs: BooksService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    // Get the books and data about this library, and set display variables
    this.initLibrary();
  }

}
