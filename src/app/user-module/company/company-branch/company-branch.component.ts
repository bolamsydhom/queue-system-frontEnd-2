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
  branches;
  branch;
  cityId;

  dayOfweek: number;
  companyImagyUrl;
  companyId;
  areaId;

  constructor(
    private branchService: BranchService,
    private router: Router,
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cityId = localStorage.getItem('cityId');
    this.route.params.subscribe(params => {
      this.companyId = params['companyId'];
    });
    let c = JSON.parse(localStorage.getItem('company'));
    this.companyImagyUrl = c.imgUrl;
    this.areaId = localStorage.getItem('areaId');
    console.log(this.areaId);
    if (this.areaId != null) {
      this.branchService
        .getBranchesByCityIdAndCompanyIdAndAreaId(
          this.cityId,
          this.companyId,
          this.areaId
        )
        .subscribe(data => {
          console.log('areaaa');
          console.log(data);
          this.branches = data;
          const day = new Date();
          this.dayOfweek = day.getDay();
        });
    } else {
      this.branchService
        .getBranchesByCityIdAndCompanyId(this.cityId, this.companyId)
        .subscribe(data => {
          console.log('withoutArea');
          console.log(data);
          this.branches = data;
          const day = new Date();
          this.dayOfweek = day.getDay();
          console.log(this.dayOfweek);
        });
    }

  }

  onClickBranch(branch) {
    this.ticketService.postToTicket('branch', branch);
    this.ticketService.postToTicketIds('branchId', branch._id);
    localStorage.setItem('branch', JSON.stringify(branch));
    localStorage.setItem('branchId', branch._id);
    this.router.navigate(['/companyServices', branch._id]);
  }
}
