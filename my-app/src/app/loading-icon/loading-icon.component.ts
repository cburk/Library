import { Component, OnInit, AfterViewInit, Type } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import * as anime from 'animejs';

@Component({
  selector: 'app-loading-icon',
  templateUrl: './loading-icon.component.html',
  styleUrls: ['./loading-icon.component.css']
})
export class LoadingIconComponent implements OnInit {

  isLoggedIn: boolean = true;
  rotationalDirections = {
    clockwise: 1,
    widdershins: -1
  }

  wheelDirection: number

  constructor() { }

  ngOnInit() {
    console.log("ng on init")
  }

  ngAfterViewInit() {
    console.log("ng after view init")
    this.wheelDirection = this.rotationalDirections.clockwise

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

  private flipDirections(direction: number) {
    if(direction == this.rotationalDirections.clockwise){
      return this.rotationalDirections.widdershins;
    }else{
      return this.rotationalDirections.clockwise;
    }
  }

  // Returns a random number between -3 and 3
  // TODO: Have to break out flipping rotational direction into some kind of callback
  // on completion of each turn
  private getRandomRotation()
  {
    this.wheelDirection = this.flipDirections(this.wheelDirection);
    return Math.random() * 3 * this.wheelDirection
  }

  private toTurnString(rotationDecimal)
  {
    console.log("Rotation: " + rotationDecimal + 'turn')
    return rotationDecimal + 'turn'
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
      /*
      translateX: [
        { value: 100, duration: 1200 },
        { value: 0, duration: 800 }
      ],
      */
      rotate: this.toTurnString(this.getRandomRotation()),
      backgroundColor: '#FFF',
      duration: 3000,
      easing: "easeInOutCirc",
      loop: true
    });

  }
}
