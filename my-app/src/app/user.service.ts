import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  GetLoggedInUserId(){
    // stubbed until i implement login/out, probably near the end
    return 12
  }
}
