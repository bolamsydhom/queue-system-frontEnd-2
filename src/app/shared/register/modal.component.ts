import { Component, OnInit, Inject } from '@angular/core'
import { User } from 'src/app/_service/user.service';
import { UserModel } from 'src/app/_model/user';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'modal',
    template: `
                  
                   <h3>Enter your verfication number to verify your account </h3>
                   <mat-form-field>
                    <!-- <mat-label> </mat-label> -->
                        <input matInput #number required>
            
                    </mat-form-field>
                     <div>
                        <button id="btn"  mat-raised-button color="primary" (click)="onVerifyNumber(number.value)"> send </button> 
                      
                    </div>   
  
                `,


})
export class Modal implements OnInit {
    constructor(private userService: User,
        @Inject(MAT_DIALOG_DATA) private passedData: UserModel,
        private router: Router,
        private _snackBar: MatSnackBar) { }

    verficationId;
    userObject;
    modalClosed = false;

    ngOnInit(): void {
        console.log(this.passedData['user'])
        console.log(this.passedData['id'])
        this.userObject = this.passedData['user'];
        this.verficationId = this.passedData['id'];
    }
    onVerifyNumber(token) {
        //this.spinnerEnabled = true;
        console.log(this.verficationId, token)

        this.userService.verifyCode(this.verficationId, token).subscribe(
            (response) => {
                this.userService.register(this.userObject)
                    .subscribe(
                        (response) => {
                            const loginUser = {
                                email: this.userObject.email,
                                password: this.userObject.password
                            }
                            this.userService.Login(loginUser).subscribe(
                                (response) => {
                                    //this.spinnerEnabled = false;
                                    console.log('ay7aga')
                                    localStorage.setItem('token', response['token']);
                                    localStorage.setItem('person', JSON.stringify(response['person']))
                                    localStorage.setItem('userId', response['person']._id);
                                    // this.modalClosed = true;
                                    document.getElementById('id').setAttribute('[mat-dialog-close]', 'true')
                                    this.router.navigate(['./userlocation']);
                                },
                                (error) => {

                                }
                            )

                        },
                        (error) => {
                            //this.spinnerEnabled = false;
                            console.log(error)
                            const errMsg = error['error'].message;
                            this.openSnackBar(errMsg, '');
                        }
                    );
            },
            (error) => {
                console.log(error);
                const errMsg = error['error'].message;
                this.openSnackBar(errMsg, '');
            }
        )
    }
    onClose() {

    }
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 2000,
        });
    }

}