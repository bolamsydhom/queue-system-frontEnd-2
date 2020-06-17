import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  PasswordValidator,
} from '../validators';
import { Router } from '@angular/router';
import { User } from 'src/app/_service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  emailForm: FormGroup;
  passwordForm: FormGroup

  currentInput = 'email';
  spinnerEnabled = false;

  loginData = {
    email: '',
    password: ''
  }

  backendError = false;


  account_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' },
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ]
  }

  constructor(private fb: FormBuilder, private router: Router, private userServices: User) { }

  ngOnInit(): void {
    this.createForms()
  }

  createForms() {
    this.emailForm = this.fb.group({

      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')

      ]))

    })

    this.passwordForm = this.fb.group({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    })
  }

  onEmailLogin(email) {
    this.spinnerEnabled = true;
    this.userServices.emailLogin(email.email).subscribe(
      (data) => {
        console.log(data)

        this.loginData.email = email.email;
        this.currentInput = 'password';
        this.spinnerEnabled = false;
      },
      (error) => {
        console.log(error)
        this.spinnerEnabled = false;
        this.backendError = true
      }
    )

  }
  onLogin(password) {
    this.loginData.password = password.password;
    this.spinnerEnabled = true;
    this.userServices.Login(this.loginData).subscribe(
      (response) => {
        const isAdmin = response['person'].isAdmin;
        const isEmployee = response['person'].isEmployee;

        localStorage.setItem('token', response['token']);
        localStorage.setItem('person', JSON.stringify(response['person']))
        localStorage.setItem('userId', response['person']._id);

        this.spinnerEnabled = false;
        //Routes based on role 
        if (!isAdmin && !isEmployee) {
          this.router.navigate(['userlocation']);
        }
        if (!isAdmin && isEmployee) {
          this.router.navigate(['employee']);
        }
        if (isAdmin && !isEmployee) {
          this.router.navigate(['admin'])
        }
      },
      (error) => {

      }
    )
  }


  goToRegister() {
    this.router.navigate(['./login']);
  }

  onInputChange() {

    this.backendError === true ? this.backendError = false : '';
  }

}
