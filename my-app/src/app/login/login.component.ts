import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  attemptLogin() {
    console.log("Attempting login...");
    this.userService.AttemptLogin();

    if(this.userService.IsLoggedIn()){
      // TODO: Figure out how routers/controllers work
    }
  }

}
