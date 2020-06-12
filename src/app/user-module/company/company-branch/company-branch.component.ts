import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/_service/branch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_service/user.service';
import { TicketService } from 'src/app/_service/ticket.service';

@Component({
  selector: 'app-company-branch',
  templateUrl: './company-branch.component.html',
  styleUrls: ['./company-branch.component.scss']
})
export class CompanyBranchComponent implements OnInit {
  branches: {}[] = [];
  CompanyId;
  branch;
  cityId;

  constructor(
    private BranchService: BranchService,
    private route: ActivatedRoute,
    private router: Router,
    private ticketService:TicketService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.CompanyId = params['companyId'];
    });
    this.cityId = this.ticketService.getCityID();
    this.ticketService.postUserData("companyId",this.CompanyId)
    this.branches = this.BranchService.getBranchesByCompanyId(this.CompanyId);
  }

  onClickBranch(branchId) {
    this.branch = this.BranchService.getBranchByID(branchId);
    this.ticketService.postUserData('branchId', branchId);
    this.ticketService.postUserData('branchId', this.branch);
    this.router.navigate(['/companyServices', branchId]);
  }
}
