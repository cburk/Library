import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private isLoggedIn: boolean = false;

  constructor() { }

  IsLoggedIn(){
    return this.isLoggedIn;
  }

  AttemptLogin() {
    this.isLoggedIn = true;
  }

  GetLoggedInUserId(){
    // stubbed until i implement login/out, probably near the end
    return 12
  }
}
