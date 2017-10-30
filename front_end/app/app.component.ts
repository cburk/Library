import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}} - {{author}}</h1>
  <h2>Checked out by: {{borrower}}</h2>
  <h2>Owner: {{owner}}</h2>
  `
})
export class BookComponent { 
  title = 'Godel Escher Bach'; 
  author = "Maths Guy";
  borrower = "iggy";
  owner = "burk";
}
