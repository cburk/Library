import { Component } from '@angular/core';
import { NgClass } from '@angular/common/src/directives';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'This page is Christians first (proper) angular app';

  isLoggedIn: boolean = false;

  constructor(private userService: UserService){

  }

  ngOnInit()
  {
    this.isLoggedIn = this.userService.IsLoggedIn()
  }
}
