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
  dayOfweek:number;
  companyImagyUrl;

  constructor(
    private branchService: BranchService,
    private router: Router,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.cityId = this.ticketService.getId('city');
    // this.route.params.subscribe(params => {
    //   this.CompanyId = params['companyId'];
    //   console.log(this.CompanyId)
    // });
    let c = this.ticketService.get('company');
    this.companyImagyUrl=c.imgUrl;

    this.branchService.getById(this.cityId).subscribe(data => {
      this.branches = data;
      const day = new Date();
      this.dayOfweek = day.getDay();
    });
  }

  onClickBranch(branch) {
    this.ticketService.postToTicket('branch', branch);
    this.router.navigate(['/companyServices', branch._id]);
  }
}
