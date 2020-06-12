import { Component, OnInit, ElementRef, ViewChild, ViewRef } from '@angular/core';
import { FormControl, Form } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgForm , NgModel} from '@angular/forms';

import { Company } from 'src/app/_model/company';
import { CompanyService } from 'src/app/_service/company.service';
import { MatOption } from '@angular/material/core';
import { Router, ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-comapany-listing',
  templateUrl: './comapany-listing.component.html',
  styleUrls: ['./comapany-listing.component.scss'],

})
export class ComapanyListingComponent implements OnInit {
  myControl = new FormControl();
  companies: Company[];
  shimmerFlag=true;
  companyOptions: Observable<Company[]>;
  inputValueId:number;
  companyimgId:number;
  imgSrc="../../../assets/images/Path 34.png";

   @ViewChild('nextScreen') arrow: ElementRef;
   @ViewChild('selectedValue') selectedValue: MatOption ;


  constructor(private copmanyService:CompanyService,
    private router: Router,
    private activatedroute:ActivatedRoute) { }

  ngOnInit() {
    this.companies=this.copmanyService.getAll()
    this.companyOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.companies.slice())
      );





  }
  ngOnCheck(){}

  displayFn(user: Company): string {
    return user && user.name ? user.name : '';
  }
  private _filter(name: string): Company[] {
    const filterValue = name.toLowerCase();
    return this.companies.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit(){
  this.inputValueId=this.selectedValue.value.id;
   // console.log(this.inputValueId)
    if(this.imgSrc!=="../../../assets/images/Path 34.png"){
     this.router.navigate(['/companyBranch',this.inputValueId])
    }
  }

  onInput(a){
    // console.log(a.target.value)
    if(a.target.value!="")
    {
    this.arrow.nativeElement.style.cursor="not-allowed"
    }
    else this.imgSrc="../../../assets/images/Path 34.png";
  }

  onSelect(){
    this.imgSrc="../../../assets/images/PathColored 34.png";
    this.arrow.nativeElement.style.cursor="pointer";
  }

  onImageClick(id:number){
  // alert(id)
   this.companyimgId=id;
   this.router.navigate(['/companybranch',this.companyimgId])

  }

}
