import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,

  Validators

} from '@angular/forms';
import { PasswordValidator } from '../validators';
import { Router } from '@angular/router';
import { User } from 'src/app/_service/user.service';
import { TicketService } from 'src/app/_service/ticket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailForm: FormGroup;
  passwordForm: FormGroup;

  currentInput = 'email';
  spinnerEnabled = false;

  loginData = {
    email: '',
    password: ''

  };

  backendError = false;

  account_validation_messages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long'

      },
      {
        type: 'pattern',
        message:
          'Your password must contain at least one uppercase, one lowercase, and one number',
      },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userServices: User,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    // localStorage.clear()
    this.createForms();
  }

  createForms() {
    this.emailForm = this.fb.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      )

    });

    this.passwordForm = this.fb.group({
      password: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ])
      )
    });
  }

  onEmailLogin(email) {
    this.spinnerEnabled = true;
    this.userServices.emailLogin(email.email).subscribe(
      (data) => {
        console.log(data);

        this.loginData.email = email.email;
        this.currentInput = 'password';
        this.spinnerEnabled = false;
      },
      (error) => {
        console.log(error);
        this.spinnerEnabled = false;
        this.backendError = true;
      }
    );
  }
  onLogin(password) {
    this.loginData.password = password.password;
    this.spinnerEnabled = true;
    this.userServices.Login(this.loginData).subscribe(
      response => {
        const isAdmin = response['person'].isAdmin;
        const isEmployee = response['person'].isEmployee;

        console.log(localStorage.getItem('cityId'));

        localStorage.setItem('token', response['token']);
        localStorage.setItem('person', JSON.stringify(response['person']));
        localStorage.setItem('userId', response['person']._id);
        console.log(localStorage.getItem('cityId'));

        this.spinnerEnabled = false;

        //Routes based on role
        if (!isAdmin && !isEmployee) {

          if (localStorage.getItem('hasTicket')) {
            console.log('aaaaa');
            this.ticketService.postToTicketIds(
              'userId',
              localStorage.getItem('userId')
            );
            this.ticketService.postToTicket(
              'user',
              localStorage.getItem('person')
            );
            this.ticketService.goToTicket().subscribe(response => {
              this.spinnerEnabled = false;
              localStorage.setItem('ticket', JSON.stringify(response));
              const customer = response['newCst'];
              let securityCode = customer.securityCode;
              let queueNumber = customer.queueNumber;
              console.log(response['estimaedTime']);
              let estimatedTime = response['estimaedTime'];
              if (estimatedTime < 60) {
                estimatedTime = `${estimatedTime} minutes`;
              } else {
                estimatedTime = `${estimatedTime / 60} hours`;
              }
              console.log(estimatedTime);
              this.ticketService.postToTicket('securityCode', securityCode);
              this.ticketService.postToTicket('queueNumber', queueNumber);
              this.ticketService.postToTicket('estimatedTime', estimatedTime);
              var today = new Date();
              var date =
                today.getDate() +
                '-' +
                (today.getMonth() + 1) +
                '-' +
                today.getFullYear();
              var time =
                today.getHours() +
                ':' +
                today.getMinutes() +
                ':' +
                today.getSeconds();
              localStorage.setItem('date', date);
              localStorage.setItem('time', time);
              this.ticketService.postToTicket('date', date);
              this.ticketService.postToTicket('time', time);
            });
            this.router.navigate(['/ticket']);
          } else {
         this.router.navigate(['userlocation'], { replaceUrl: true });
          }

        }
        if (!isAdmin && isEmployee) {
          this.router.navigate(['employee']);
        }
        if (isAdmin && !isEmployee) {
          this.router.navigate(['admin']);
        }
      },

      (error) => {

        console.log(error);
        this.spinnerEnabled = false;
        this.backendError = true;
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onInputChange() {
    this.backendError === true ? (this.backendError = false) : '';
  }

}
