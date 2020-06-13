import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  isLoggedIn = true
  constructor() { }

  ngOnInit(): void {
    this.isUserLoggedIn()
  }


  isUserLoggedIn() {

    localStorage.getItem('token') ? this.isLoggedIn = true : this.isLoggedIn = false;
  }

}
