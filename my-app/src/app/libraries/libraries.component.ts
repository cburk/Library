import { Component, OnInit } from '@angular/core';
import { Library } from '../library'

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.css']
})
export class LibrariesComponent implements OnInit {
  lockText: string = "Unlock";

  library: Library = new Library("Library 1", "123 N 1st St", true);

  constructor() { }

  ngOnInit() {
  }

}
