import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from 'src/app/_service/branch.service';
import { User } from 'src/app/_service/user.service';
import { TicketService } from 'src/app/_service/ticket.service';
@Component({
  selector: 'app-company-services',
  templateUrl: './company-services.component.html',
  styleUrls: ['./company-services.component.scss']
})
export class CompanyServicesComponent implements OnInit {
  imgSrc = '../../../assets/images/arrow1.png';
  branchId;
  cityId;
  companyId;
  services: {}[] = [];
  @ViewChild('nextScreen') arrow: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private BranchService: BranchService,
    private ticketService:TicketService
  ) {}

  ngOnInit(): void {
    this.cityId = this.ticketService.getCityID();
    console.log(this.cityId)
    this.companyId = this.ticketService.getCompanyId();
    console.log(this.companyId)

    this.route.params.subscribe(params => {
      this.branchId = params['branchId'];
    });
    console.log(this.branchId);
    // this.services = this.BranchService.getServicesByBranchId(this.branchId);
  }
  goToTicketOrLogin(){
    
  }
  selectService(){
    this.imgSrc = '../../../assets/images/arrow2.png';
      this.arrow.nativeElement.style.cursor = 'pointer';
  }
}
