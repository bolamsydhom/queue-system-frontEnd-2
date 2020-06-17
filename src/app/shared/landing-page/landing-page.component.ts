import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  isClicked = false;

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

}
