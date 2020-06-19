import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  yous="youstina"
  hide = true;
  accountDetailsForm: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  myControl = new FormControl();
  optionss: string[] = ['Giza', 'Cairo', 'Ismailia'];
  filteredOptions: Observable<string[]>;
  @ViewChild('save') arrow: ElementRef;

  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(fb: FormBuilder , private router: Router) {
    
    this.accountDetailsForm = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });



}   ngOnInit() {
 
    this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
  );

  
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.optionss.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
}


getErrorMessage() {
  if (this.email.hasError('required')) {
    return 'You must enter a value';
  }

  return this.email.hasError('email') ? 'Not a valid email' : '';
}


onSubmit(form){
  // alert("okay")
  console.log(form.value)
}


onOut(){
 if( confirm("Are You Sure You Want To Logout ?")){

   this.router.navigate(['/']);
 }   
}
}