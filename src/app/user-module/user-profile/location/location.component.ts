import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  localStorageUserInfo;
  panelOpenState = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.localStorageUserInfo = JSON.parse(localStorage['person']);
    }
  }
  onOut(){
    if( confirm("Are You Sure You Want To Logout ?")){
   
      this.router.navigate(['/']);
    }   
   }


   onDelete(his) {
    console.log(his);
    his.remove();
    //   var undeleted = this.history.filter(
    //     (tr) => tr.comanyName !== his.comanyName
    //   );
    //   this.history = undeleted;
    // }
  }
}
