import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import * as anime from 'animejs';

@Component({
  selector: 'app-loading-icon',
  templateUrl: './loading-icon.component.html',
  styleUrls: ['./loading-icon.component.css']
})
export class LoadingIconComponent implements OnInit {

  isLoggedIn: boolean = true;

  constructor() { }

  ngOnInit() {
    console.log("Anime: ")
    console.log(anime)
    /*
    anime({
      targets: 'div',
      translateX: [
        { value: 100, duration: 1200 },
        { value: 0, duration: 800 }
      ],
      rotate: '1turn',
      backgroundColor: '#FFF',
      duration: 2000,
      loop: true
    });
    */
  }

}
