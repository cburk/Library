import { Component, OnInit } from '@angular/core';
import { Library } from '../library'
import { BooksService } from 'app/books.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  libraries: Library[];

  constructor(private bookService: BooksService) { }

  ngOnInit() {
    this.bookService.getAllLibraries().subscribe(libraries => {
      this.libraries = libraries;
    })
  }

}
