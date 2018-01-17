import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book';
import { BooksService } from 'app/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  @Input() book: Book;
  checkText: string// = this.getButtonText()
  error: string

  constructor(private bookService: BooksService) { }

  ngOnInit() {
    this.error = ""
    this.checkText = this.getButtonText();
  }

  getButtonText(): string{
    return this.book.available ? "Checkout" : "Return"
  }

  // Makes a web request to check the book in or out, depending on its current status
  checkInOut(){

  }
}
