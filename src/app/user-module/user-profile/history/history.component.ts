import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['branch', 'Start', 'End'];

  constructor() { }

  ngOnInit(): void {
  }

  test(){
    alert("delete")
  }
}
