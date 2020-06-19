import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from 'src/app/_service/branch.service';
import { User } from 'src/app/_service/user.service';
import { TicketService } from 'src/app/_service/ticket.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Service } from './../../../_model/service';
import { error } from 'console';

import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-company-services',
  templateUrl: './company-services.component.html',
  styleUrls: ['./company-services.component.scss']
})
export class CompanyServicesComponent implements OnInit {
  imgSrc = '../../../assets/images/arrow1.png';
  companyImagyUrl;
  cityId;
  companyId;
  services;

  ServiceSelected = '';

  spinnerEnabled = false;

  @ViewChild('nextScreen') arrow: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private BranchService: BranchService,
    private ticketService: TicketService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let c = this.ticketService.get('company');
    this.companyId = c._id;
    this.companyImagyUrl = c.imgUrl;

    let city = this.ticketService.get('city');
    this.cityId = city._id;

    let branch = this.ticketService.get('branch');
    this.services = branch.services;
  }
  goToTicketOrLogin() {
    this.spinnerEnabled = true;

    if (Object.keys(this.ServiceSelected).length) {
      if (localStorage.getItem('token')) {
        this.ticketService.postToTicketIds(
          'userId',
          localStorage.getItem('userId')
        );
        this.ticketService.postToTicket('user', localStorage.getItem('person'));

        this.ticketService.goToTicket()
          .subscribe(
            (response) => {
              this.spinnerEnabled = false;
              const customer = response['newCst'];
              let securityCode = customer.securityCode;
              let queueNumber = customer.queueNumber;
              console.log(response['estimaedTime'])
              let estimatedTime = response['estimaedTime'];
              if (estimatedTime < 60) {
                estimatedTime = `${estimatedTime} minutes`
              } else {
                estimatedTime = `${estimatedTime / 60} hours`;

              }
              console.log(estimatedTime)
              this.ticketService.postToTicket('securityCode', securityCode);
              this.ticketService.postToTicket('queueNumber', queueNumber);
              this.ticketService.postToTicket('estimatedTime', estimatedTime);
              //this.ticketService.postToTicket('createdAt', response['createdAt']);

              var today = new Date();
              var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              this.ticketService.postToTicket('date', date)
              this.ticketService.postToTicket('time', time)

              this.router.navigate(['/ticket']);

            },
            (error) => {
              this.spinnerEnabled = false;
              const errMsg = error['error'].message;
              this.openSnackBar(errMsg, '');
            })

      }
      else this.router.navigate(['/login']);
    }
    // else {
    //   console.log('else 2')
    // }
  }
  selectService(service) {

    this.ServiceSelected = service;
    this.imgSrc = '../../../assets/images/arrow2.png';
    // this.arrow.nativeElement.style.cursor = 'pointer';
    this.ticketService.postToTicket('services', this.ServiceSelected);
    this.ticketService.postToTicketIds('service', this.ServiceSelected);

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
