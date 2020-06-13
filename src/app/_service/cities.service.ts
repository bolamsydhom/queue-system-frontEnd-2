import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../_model/city';
@Injectable({ providedIn: 'root' })
export class CitiesService {
  constructor(private http: HttpClient) {}
  url = 'https://queue-sys-backend.herokuapp.com';
  cities: City[] = [];
  getAllCities() {
    return this.http.get(`${this.url}/city`);
  }
}
