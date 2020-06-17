import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ViewRef
} from '@angular/core';
import { FormControl, Form } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgForm, NgModel } from '@angular/forms';

import { Company } from 'src/app/_model/company';
import { CompanyService } from 'src/app/_service/company.service';
import { MatOption } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_service/user.service';
import { TicketService } from 'src/app/_service/ticket.service';

@Component({
  selector: 'app-comapany-listing',
  templateUrl: './comapany-listing.component.html',
  styleUrls: ['./comapany-listing.component.scss']
})
export class ComapanyListingComponent implements OnInit {
  myControl = new FormControl();
  companies;
  shimmerFlag = true;
  companyOptions: Observable<Company[]>;
  inputValueId;
  companyimgId;
  imgSrc = '../../../assets/images/Path 34.png';
  cityId;
  noCompanyFound = false;

  @ViewChild('nextScreen') arrow: ElementRef;
  @ViewChild('selectedValue') selectedValue: MatOption;

  constructor(
    private copmanyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cityId = params['cityId'];
    });
    this.copmanyService.getCompaniesByCityId(this.cityId).subscribe(
      (data) => {

      this.companies = data;
    },
    (error) =>{
      this.noCompanyFound = true;
      console.log(error);

    }
    );
    this.companies = this.copmanyService.getAllCompanies();
    this.companyOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.companies.map(e => e)))
    );
  }
  ngOnCheck() {}

  displayFn(user: Company): string {
    return user && user.name ? user.name : '';
  }
  private _filter(name: string): Company[] {
    const filterValue = name.toLowerCase();
    return this.companies.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onSubmit() {
    this.inputValueId = this.selectedValue.value._id;
    this.ticketService.postToTicket('company', this.selectedValue.value);
    if (this.imgSrc !== '../../../assets/images/Path 34.png') {
      this.router.navigate(['/companyBranch', this.inputValueId]);
    }
  }

  onInput(a) {
    if (a.target.value != '') {
      this.arrow.nativeElement.style.cursor = 'not-allowed';
    } else this.imgSrc = '../../../assets/images/Path 34.png';
  }

  onSelect() {
    this.imgSrc = '../../../assets/images/PathColored 34.png';
    this.arrow.nativeElement.style.cursor = 'pointer';
  }

  onImageClick(company) {
    this.ticketService.postToTicket('company',company)
    this.companyimgId = company._id;
    this.router.navigate(['/companyBranch', this.companyimgId]);
  }
}
