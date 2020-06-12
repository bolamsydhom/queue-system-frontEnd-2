import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from 'src/app/_service/branch.service';
@Component({
  selector: 'app-company-services',
  templateUrl: './company-services.component.html',
  styleUrls: ['./company-services.component.scss']
})
export class CompanyServicesComponent implements OnInit {
  imgSrc = '../../../assets/images/arrow1.png';
  branchId;
  services: {}[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private BranchService: BranchService
  ) {}

  ngOnInit(): void {
    this.branchId = this.route.snapshot.params['branchId'];
    this.services = this.BranchService.getServicesByBranchId(+this.branchId);
    console.log(this.services);
  }
}
