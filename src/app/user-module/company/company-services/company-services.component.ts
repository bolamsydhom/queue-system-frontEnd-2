import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from 'src/app/_service/branch.service';
import { User } from 'src/app/_service/user.service';
import { TicketService } from 'src/app/_service/ticket.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-company-services',
  templateUrl: './company-services.component.html',
  styleUrls: ['./company-services.component.scss']
})
export class CompanyServicesComponent implements OnInit {
  imgSrc = '../../../assets/images/arrow1.png';
  companyImagyUrl;
  cityId;
  companyId;
  services;
  serviceSelected = {};

  @ViewChild('nextScreen') arrow: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private BranchService: BranchService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    let c = this.ticketService.get('company');
    this.companyId = c._id;
    this.companyImagyUrl = c.imgUrl;

    let city = this.ticketService.get('city');
    this.cityId = city._id;

    let branch = this.ticketService.get('branch');
    this.services = branch.services;
  }
  goToTicketOrLogin() {
    if (Object.keys(this.serviceSelected).length != 0) {
      if (localStorage.getItem['token']) {
        this.router.navigate(['/ticket']);
      } else this.router.navigate(['/login']);
    }
  }
  selectService(service) {
    this.serviceSelected = service;
    this.imgSrc = '../../../assets/images/arrow2.png';
    this.arrow.nativeElement.style.cursor = 'pointer';
    this.ticketService.postToTicket('services', this.serviceSelected);

    this.ticketService.postIdToTicket('serviceId',service._id);
  }
}
