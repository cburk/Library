import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BOOKS } from '../mock-books'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  books: Book[] = BOOKS;
  
  constructor() { }

  ngOnInit() {
  }
}
