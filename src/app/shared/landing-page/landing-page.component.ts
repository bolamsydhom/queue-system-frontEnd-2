import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  isClicked = true;
  // color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  src = "../../../assets/images/without.png";

  constructor() { }

  ngOnInit(): void {
    AOS.init();

  }



  revealingContent(state) {
    this.isClicked = state;



  }

  scrolling(event) {
    console.log(event);


  }
  toogeled(){
    this.checked = !this.checked;

    this.src = this.checked ? '../../../assets/images/wiht.png' : '../../../assets/images/without.png';
    console.log(this.checked);

  }

}
