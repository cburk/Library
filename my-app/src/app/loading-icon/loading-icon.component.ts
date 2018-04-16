import { Component, OnInit, AfterViewInit } from '@angular/core';
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
    console.log("ng on init")
  }

  ngAfterViewInit() {
    console.log("ng after view init")
    
    var svgIcon = document.getElementById("fullLockSVG") as HTMLObjectElement;
    console.log("fullLockSVG")
    console.log(svgIcon);

    /*
    anime({
      targets: LockBase,
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

  public startAnimation(): void {
    console.log("Trying to animate");
    var svgDoc = (document.getElementById("fullLockSVG") as HTMLObjectElement).getSVGDocument()
    console.log("Svg doc")
    console.log(svgDoc)
    var lockWheel = svgDoc.getElementById("LockWheel")
    console.log("lockWheel");
    console.log(lockWheel)

    anime({
      targets: lockWheel,
      translateX: [
        { value: 100, duration: 1200 },
        { value: 0, duration: 800 }
      ],
      rotate: '1turn',
      backgroundColor: '#FFF',
      duration: 2000,
      loop: true
    });

  }
}
