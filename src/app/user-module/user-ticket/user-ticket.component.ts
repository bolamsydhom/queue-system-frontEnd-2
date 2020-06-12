import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.scss']
})
export class UserTicketComponent implements OnInit {

  isLoggedIn = true
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isUserLoggedIn()
  }

  isUserLoggedIn() {

    localStorage.getItem('token') ? this.isLoggedIn = true : this.isLoggedIn = false;
  }

  navigateToRegister() {
    this.router.navigate(['./login'])
  }
  navigateToLogin() {
    this.router.navigate(['./register'])

  }

}
