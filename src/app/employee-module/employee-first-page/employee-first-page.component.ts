
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Subject, interval } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';

export interface Entry {
  created: Date;
  id: string;
}

export interface TimeSpan {
  hours: number;
  minutes: number;
  seconds: number;

}

@Component({
  selector: 'app-employee-first-page',
  templateUrl: './employee-first-page.component.html',
  styleUrls: ['./employee-first-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFirstPageComponent implements OnInit {

  securityCode: string;
  isUserVerified: boolean = false;
  //timer
  private destroyed = new Subject();

  constructor(private changeDetector: ChangeDetectorRef) { }


  //timer
  entries: Entry[] = [
    { id: '', created: new Date() }
  ];


  ngOnInit() {

    interval(1000).subscribe(() => {
      if (!this.changeDetector['destroyed']) {
        this.changeDetector.detectChanges();
      }
    });

    this.changeDetector.detectChanges();

    this.securityCode = '55';
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  getElapsedTime(entry: Entry): TimeSpan {
    let totalSeconds = Math.floor((new Date().getTime() - entry.created.getTime()) / 1000);

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (totalSeconds >= 3600) {
      hours = Math.floor(totalSeconds / 3600);
      totalSeconds -= 3600 * hours;
    }

    if (totalSeconds >= 60) {
      minutes = Math.floor(totalSeconds / 60);
      totalSeconds -= 60 * minutes;
    }

    seconds = totalSeconds;

    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  OnSecurityCodeCheck(userSecurityCode: string) {
    if (userSecurityCode === this.securityCode) {
      //alert('user verified');
      this.isUserVerified = true;

    }
    else {
      this.isUserVerified = false;
    }
    console.log(this.isUserVerified)
  }

}

