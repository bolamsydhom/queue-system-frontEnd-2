
import { Injectable } from '@angular/core';
import { UserModel } from '../_model/user'
import { HttpClient } from '@angular/common/http';


@Injectable()
export class User {

    url = 'https://queue-sys-backend.herokuapp.com/';

    constructor(private http: HttpClient) { }

    //private http: HttpClient
    register(user: UserModel) {
        console.log(user)
        return this.http.post(`${this.url}user/register`, user);
    }
}