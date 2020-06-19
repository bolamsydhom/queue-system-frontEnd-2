import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['branch', 'Start', 'End'];
  localStorageUserInfo;
  history = [
    {
      comanyName: 'Vodafone',
      seviceName: 'Vodafone Cash',
      date: '15-6-2020',
      time: '09:13:44',
    },
    {
      comanyName: 'Bank Misr',
      seviceName: 'Withdrawal ',
      date: '1-1-2020',
      time: '20:13:44',
    },
    {
      comanyName: 'Orange',
      seviceName: 'Orange Cash',
      date: '18-12-2019',
      time: '15:12:04',
    },
    {
      comanyName: 'QNB',
      seviceName: 'Deposit',
      date: '15-5-2019',
      time: '03:11:04',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.localStorageUserInfo = JSON.parse(localStorage['person']);
    }
    console.log(this.history);
  }

  onDelete(his) {
    console.log(his);
    if (confirm('Are You Sure You Want To DELETE it ?')) {
      var undeleted = this.history.filter(
        (tr) => tr.comanyName !== his.comanyName
      );
      this.history = undeleted;
    }
  }

  onOut() {
    if (confirm('Are You Sure You Want To Logout ?')) {
      this.router.navigate(['/']);
    }
  }
}
