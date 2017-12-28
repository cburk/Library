import { Component } from '@angular/core';
import { NgClass } from '@angular/common/src/directives';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'This page is Christians first (proper) angular app';

  ngOnInit()
  {
  }
}
