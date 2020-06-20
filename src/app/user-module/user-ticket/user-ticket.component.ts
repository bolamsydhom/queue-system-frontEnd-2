import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { TicketService } from 'src/app/_service/ticket.service';
import { tick } from '@angular/core/testing';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.scss']
})
export class UserTicketComponent implements OnInit {
  //Routing of the navbar
  isLoggedIn = true;
  ticket: {};
  company: {};
  branch: {};
  time;
  date;

  constructor(private router: Router, private ticketService: TicketService) {}

  ngOnInit(): void {
    this.isUserLoggedIn();
    this.ticket = JSON.parse(localStorage.getItem('ticket'));
    console.log(this.ticket);
    this.company = JSON.parse(localStorage.getItem('company'));
    this.branch = JSON.parse(localStorage.getItem('branch'));
    this.time = localStorage.getItem('time');
    this.date = localStorage.getItem('date');
    console.log(this.ticket);
    console.log(this.date);
  }

  isUserLoggedIn() {
    localStorage.getItem('token')
      ? (this.isLoggedIn = true)
      : (this.isLoggedIn = false);
  }

  navigateToRegister() {
    this.router.navigate(['./login']);
  }
  navigateToLogin() {
    this.router.navigate(['./register']);
  }
  navigateToHistory() {
    this.router.navigate(['./profile/history']);

  }
  navigateToLocation(){
    this.router.navigate(['./profile/location']);

  }
  navigateToSetting(){
    this.router.navigate(['./profile/setting']);

  }

}
