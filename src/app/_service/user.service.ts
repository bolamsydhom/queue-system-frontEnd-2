import { Injectable, EventEmitter } from '@angular/core';
import { UserModel } from '../_model/user';
import { HttpClient } from '@angular/common/http';
import { City } from './../_model/city';
import { Area } from './../_model/area';
import { browser } from 'protractor';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class User {
  iceId;

  verficationNumber;

  url = 'https://queue-sys-backend.herokuapp.com/';

  constructor(private http: HttpClient) { }
  modalClosed = false;
  modal = new BehaviorSubject<boolean>(this.modalClosed);
  //private http: HttpClient

  //private http: HttpClient
  register(user: UserModel) {
    console.log(user)
    return this.http.post(`${this.url}user/register`, user);
  }


  emailLogin(email) {

    return this.http.post(`${this.url}user/email`, { email })
  }

  Login(user) {

    return this.http.post(`${this.url}user/login`, user)
  }

  imageUpload(img) {
    let formData = new FormData();
    formData.append('photo', img)
    return this.http.post(`${this.url}user/upload-image`, formData)
  }

  generateCode(number) {
    const phoneNumber = {
      phone: `+20${number}`
    }
    return this.http.post(`${this.url}user/generateCode`, phoneNumber)
  }

  verifyCode(id, token) {
    console.log('in verify code')
    const data = {
      id: id,
      token: token
    }
    return this.http.post(`${this.url}user/verifyCode`, data)
  }
}

