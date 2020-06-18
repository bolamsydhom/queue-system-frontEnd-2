import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['branch', 'Start', 'End'];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  test(){
    alert("delete")
  }
  onOut(){
    if( confirm("Are You Sure You Want To Logout ?")){
   
      this.router.navigate(['/']);
    }   
   }
}
