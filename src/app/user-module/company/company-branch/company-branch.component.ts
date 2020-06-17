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
  companyId;
  dayOfweek: number;
  companyImagyUrl;
  areaId = '';
  branchRecommended;

  constructor(
    private branchService: BranchService,
    private router: Router,
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cityId = this.ticketService.getId('city');
    this.route.params.subscribe(params => {
      this.companyId = params['companyId'];
    });
    let c = this.ticketService.get('company');
    this.companyImagyUrl = c.imgUrl;

    this.areaId = this.ticketService.getId('area');
    console.log(this.areaId);

    if (this.areaId != undefined) {
      this.branchService
        .getBranchesByCityIdAndCompanyIdAndAreaId(
          this.cityId,
          this.companyId,
          this.areaId
        )
        .subscribe(data => {
          this.branchRecommended = data;
          console.log('aaaaaaaaaaaaa');
          console.log(this.branchRecommended);
        });
    }

    this.branchService
      .getBranchesByCityIdAndCompanyId(this.cityId, this.companyId)
      .subscribe(data => {
        console.log(data);
        this.branches = data;
        const day = new Date();
        this.dayOfweek = day.getDay();
      });
  }

  onClickBranch(branch) {
    this.ticketService.postToTicket('branch', branch);
    this.ticketService.postIdToTicket('branchId', branch._id);
    this.router.navigate(['/companyServices', branch._id]);
  }
}
