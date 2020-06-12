import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/_service/branch.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-branch',
  templateUrl: './company-branch.component.html',
  styleUrls: ['./company-branch.component.scss']
})
export class CompanyBranchComponent implements OnInit {
  branches: {}[] = [];
  CompanyId: number;
  branch;

  constructor(
    private BranchService: BranchService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.CompanyId = this.route.snapshot.params['companyId'];
    this.branches = this.BranchService.getBranchesByCompanyId(+this.CompanyId);
  }

  onClickBranch(branchId: number) {
    console.log(branchId);
    this.branch = this.BranchService.getBranchByID(branchId);
    this.router.navigate(['/companyServices', branchId]);
  }
}
