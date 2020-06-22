import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-serve-user',
  templateUrl: './serve-user.component.html',
  styleUrls: ['./serve-user.component.scss']
})
export class ServeUserComponent implements OnInit {
  @Input()
  name
  @Input()
  date
  @Input()
  time
  @Input()
  estimated
  @Output() closeModel = new EventEmitter<boolean>();



  constructor() { }

  ngOnInit(): void {
  }
  clickHandler() {
    console.log('pressed');

    this.closeModel.emit(false);
  }
}
