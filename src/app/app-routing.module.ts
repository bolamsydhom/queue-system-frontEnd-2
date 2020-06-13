import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';
import { EmployeeFirstPageComponent } from './employee-module/employee-first-page/employee-first-page.component';
import {ComapanyListingComponent} from './user-module/company/comapany-listing/comapany-listing.component';
import {UserLocationComponent} from './user-module/user-location/user-location.component'
import { CompanyServicesComponent } from './user-module/company/company-services/company-services.component';
import { CompanyBranchComponent } from './user-module/company/company-branch/company-branch.component';
import { UserTicketComponent } from './user-module/user-ticket/user-ticket.component';
import { HistoryComponent } from './user-module/user-profile/history/history.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'employee', component: EmployeeFirstPageComponent },
  { path: '', component: LandingPageComponent },
  { path: '', component: LandingPageComponent },
  {path:'userlocation',component:UserLocationComponent},
  {path:'companylisting/:cityId', component:ComapanyListingComponent},
  {path:'companyBranch/:companyId',component:CompanyBranchComponent},
  {path:'companyServices/:branchId',component:CompanyServicesComponent},
  { path: 'ticket', component: UserTicketComponent },
  { path: 'profile/history', component: HistoryComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
