import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'This page is Christians first (proper) angular app';

  ngOnInit()
  {
    /*
    @http({
      method: 'GET',
      url: 'http:localhost:8080/BookList'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
      */
  }
}
