import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tick } from '@angular/core/testing';
import { browser } from 'protractor';

@Injectable({ providedIn: 'root' })
export class TicketService {
  constructor(private http: HttpClient) { }
  url = 'https://queue-sys-backend.herokuapp.com';

  ticket = {
    user: {},
    city: {},
    area: {},
    company: {},
    branch: {},
    services: {},
    securityCode: '',
    estimatedTime: '',
    queueNumber: '',
    time: '',
    date: ''
  };

  ticketIds = {
    userId: '',
    cityId: '',
    companyId: '',
    branchId: '',
    service: { _id: '', name: '' }
  };


  postToTicket(type, value) {
    this.ticket[type] = value;
    if (type === 'services') {
      localStorage.setItem('hasTicket', 'true');
    }
  }


  postToTicketIds(type, value) {
    this.ticketIds[type] = value;
  }

  goToTicket() {
    return this.http.post(`${this.url}/queue/book`, this.ticketIds);
  }


  getId(type: string) {
    return this.ticket[type]._id;
  }
  get(type: string) {
    return this.ticket[type];
  }
  getTicket() {
    return this.ticket;
  }
}
