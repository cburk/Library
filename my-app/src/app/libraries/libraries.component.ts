import { Component, OnInit } from '@angular/core';
import { Library } from '../library'
import { LIBRARIES } from '../mock-libraries'

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.css']
})
export class LibrariesComponent implements OnInit {
  lockText: string = "Unlock";

  allLibraries: Library[] = LIBRARIES;
  libraries: Library[] = LIBRARIES;

  // TODO: Can probably break out into own component
  query: string;
  searchForLibrary(query: string) {
    if(query == ""){
      this.libraries = this.allLibraries
    }else{
      this.libraries = this.allLibraries.filter(lib => lib.name == query);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
