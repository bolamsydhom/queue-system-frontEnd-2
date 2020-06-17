import { Company } from './../_model/company';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  constructor(private http: HttpClient) {}
  url = 'https://queue-sys-backend.herokuapp.com';
  companySelected = new EventEmitter<Company>();

  companies: Company[] = [];

  getAllCompanies() {
    return this.companies.slice();
  }

  getCompanyById(id: number) {
    return this.companies.find(p => p.id === id);
  }
  getCompaniesByCityId(cityId: string) {
    return this.http.get(`${this.url}/organization/city/${cityId}`);
  }
}
