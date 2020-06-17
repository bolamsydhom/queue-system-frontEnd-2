import { tick } from '@angular/core/testing';
import { browser } from 'protractor';

export class TicketService {
  ticket = {
    city: {},
    area: {},
    company: {},
    branch: {},
    services: {}
  };

  ticketId = {
    cityId: '',
    areaId: '',
    companyId: '',
    branchId: '',
    serviceId: ''
  };

  postIdToTicket(type, value) {
    this.ticketId[type] = value;
  }


  postToTicket(type, value) {
    this.ticket[type] = value;
    if (type === 'services') {
      localStorage.setItem('hasTicket', 'true');
    }
  }




  getId(type: string) {
    return this.ticket[type]._id;
  }
  get(type: string) {
    return this.ticket[type];
  }
}
