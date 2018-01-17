import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book';
import { BooksService } from 'app/books.service';
import { Observable } from 'rxjs/Observable';
import { ResponseJSON } from 'app/responseJSON';

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

  checkInOut(){
    if(this.book.available){
      console.log("In handler, attempting check out")
      this.checkOut()
    }
  }

  // Makes a web request to check the book in or out, depending on its current status
  checkOut(){
    console.log("The id isn't here? " + this.book)
    console.log(this.book)

    this.bookService.checkoutBook(this.book.bookId).subscribe(resJSON => {
      // If this was an error (either one), print the message
      if(!this.bookService.validCheckoutResponse(resJSON)){
        this.error = resJSON.Response
      // Otherwise, update the book's state
      }else{
        console.log("Component flipping availability")
        this.book.available = !this.book.available
        this.checkText = this.getButtonText();
      }
    })
  }


}
