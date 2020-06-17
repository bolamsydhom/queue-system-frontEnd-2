import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area } from '../_model/area';

@Injectable({ providedIn: 'root' })
export class AreaService {
  constructor(private http: HttpClient) {}
  url = 'https://queue-sys-backend.herokuapp.com';

    Areas:Area[] = [];
  
    getAreasByCityId(cityId) {
      return this.http.get(`${this.url}/city/area/${cityId}`)
    }

  }

}
