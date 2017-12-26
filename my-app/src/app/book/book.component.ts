import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  title = "Pale Fire";
  author = "Nabokov";
  coverImg = "https://upload.wikimedia.org/wikipedia/en/f/f4/Nabokov_Pale_Fire.jpg";

  constructor() { }

  ngOnInit() {
  }

}
