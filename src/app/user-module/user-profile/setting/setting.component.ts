import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  NgForm,
} from '@angular/forms';

import { Router } from '@angular/router';
import { CitiesService } from 'src/app/_service/cities.service';

import {
  PasswordValidator,
  ParentErrorStateMatcher,
  UsernameValidator,
  PhoneValidator,
  Country,
} from 'src/app/shared/validators';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_service/user.service';

// export interface  {
//   name: string;
// }

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  url = 'https://queue-sys-backend.herokuapp.com';
  localStorageUserInfo;
  hide = true;
  myControl = new FormControl();
  options;
  img: File;
  image;

  spinnerEnabled = false;

  userDetailsForm: FormGroup;
  accountDetailsForm: FormGroup;

  userData: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  countries = [new Country('EG', 'Egypt')];

  account_validation_messages = {
    firstname: [
      { type: 'required', message: 'Firstname is required' },
      {
        type: 'minlength',
        message: 'Firstname must be at least 3 characters long',
      },
      {
        type: 'maxlength',
        message: 'Firstname cannot be more than 10 characters long',
      },
      // { type: 'pattern', message: 'Your firstname must contain only numbers and letters' },
      // { type: 'validUsername', message: 'Your firstname has already been taken' }
    ],
    lastname: [
      { type: 'required', message: 'Lastname is required' },
      {
        type: 'minlength',
        message: 'Lastname must be at least 3 characters long',
      },
      {
        type: 'maxlength',
        message: 'Lastname cannot be more than 10 characters long',
      },
      // { type: 'pattern', message: 'Your lastname must contain only numbers and letters' },
      // { type: 'validUsername', message: 'Your lastname has already been taken' }
    ],
    // email: [
    //   { type: 'required', message: 'Email is required' },
    //   { type: 'pattern', message: 'Enter a valid email' },
    // ],
    confirm_password: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long',
      },
      {
        type: 'pattern',
        message:
          'Your password must contain at least one uppercase, one lowercase, and one number',
      },
    ],
    phone: [
      { type: 'required', message: 'Phone is required' },
      {
        type: 'validCountryPhone',
        message: 'Phone incorrect for the country selected',
      },
    ],
  };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private citiesService: CitiesService,
    private http: HttpClient,
    private userServce : User
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.localStorageUserInfo = JSON.parse(localStorage['person']);
    }

    this.citiesService.getAllCities().subscribe((data) => {
      this.options = data;
    });

    console.log(JSON.parse(localStorage['person']));
    console.log(this.localStorageUserInfo);
    this.createForms();
  }

  createForms() {
    // matching passwords validation
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });
    // country & phone validation
    let country = new FormControl(this.countries[0], Validators.required);

    let phone = new FormControl(this.localStorageUserInfo.phoneNumber, {
      validators: Validators.compose([
        Validators.required,
        PhoneValidator.validCountryPhone(country),
      ]),
    });

    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone,
    });

    // user links form validations
    this.accountDetailsForm = this.fb.group({
      firstname: new FormControl(
        this.localStorageUserInfo.firstName,
        Validators.compose([
          UsernameValidator.validUsername,
          Validators.maxLength(10),
          Validators.minLength(3),

          // Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
          Validators.required,
        ])
      ),
      lastname: new FormControl(
        this.localStorageUserInfo.lastName,
        Validators.compose([
          UsernameValidator.validUsername,
          Validators.maxLength(10),
          Validators.minLength(3),
          // Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
          Validators.required,
        ])
      ),

      country_phone: this.country_phone_group,
    });
  }

  onOut() {
    if (confirm('Are You Sure You Want To Logout ?')) {
      this.router.navigate(['/']);
    }
  }

  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);
  }

  onSubmitAccountDetails(formData) {
    if (confirm('Are You Sure You save Changes ?')) {
      this.localStorageUserInfo.firstName = formData.firstname;
      this.localStorageUserInfo.lastName = formData.lastname;
      // this.localStorageUserInfo.phoneNumber=formData.country_phone.phone;
      localStorage['person'] = JSON.stringify(this.localStorageUserInfo);
      this.http.post(`${this.url}/ApiHere`, JSON.parse(localStorage['person']));
    }
  }
  imageSelected(event){
    console.log(event.target.files[0]);
    this.userServce.imageUpload(event.target.files[0]).subscribe(
      (respond) =>{this.image = respond;
      },
      () => {}
    )
    console.log(this.img);

  }
}
