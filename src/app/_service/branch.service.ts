import { Branch } from './../_model/branch';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BranchService {
  constructor(private http: HttpClient) {}
  url = 'https://queue-sys-backend.herokuapp.com';
  branches: Branch[] = [];

  // getBranchByID(id: number) {
  //   return this.branches.filter(b => b.branchId === id);
  // }

  // getById(cityId) {
  //   return this.http.get(`${this.url}/branch/city/${cityId}`);
  // }

  getBranchesByCityIdAndCompanyIdAndAreaId(cityId, companyId, areaId) {
    return this.http
      .get(`${this.url}/branch/recommendedBranchs?cityid=${cityId}&companyid=${companyId}&areaid=${areaId}
   `);
  }

  getBranchesByCityIdAndCompanyId(cityId, companyId) {
    return this.http.get(
      `${this.url}/branch/branch?cityid=${cityId}&companyid=${companyId}`
    );
  }

  // getBranchesByCityIdAndCompanyId(cityId, companyId) {
  //   return this.http.get(
  //     `${this.url}/branch/branch?cityid=${cityId}&companyid=${companyId}`
  //   );
  // }

  // getBranchesByCityIdAndCompanyIdAndAreaId(cityId,companyId,areaId) {
  //   return this.http.get(
  //     `${this.url}/branch/recommendedBranchs?cityid=${cityId}&companyid=${companyId}&areaid=${areaId}`
  //   );
  // }

  // getBranchesByCompanyId(companyId: number) {
  //   return this.branches.filter(b => b.companyId === companyId);
  // }
  getServicesByBranchId(branchId: number) {
    let branch = this.branches.filter(b => b.branchId === branchId);
    return branch[0].services;
  }
}
