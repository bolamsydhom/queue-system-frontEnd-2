import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';
import { EmployeeFirstPageComponent } from './employee-module/employee-first-page/employee-first-page.component';
import { ComapanyListingComponent } from './user-module/company/comapany-listing/comapany-listing.component';
import { UserLocationComponent } from './user-module/user-location/user-location.component'
import { CompanyServicesComponent } from './user-module/company/company-services/company-services.component';
import { CompanyBranchComponent } from './user-module/company/company-branch/company-branch.component';
import { UserTicketComponent } from './user-module/user-ticket/user-ticket.component';

import { HistoryComponent } from './user-module/user-profile/history/history.component';
import { LocationComponent } from './user-module/user-profile/location/location.component';

import { AdminModule } from './admin-module/admin.module';
import { adminRoutes } from './admin-module/admin-routing.module'
import { AdminComponent } from './admin-module/admin/admin.component';
import { WarningComponent } from './user-module/alerts/warning/warning.component';
import { InfoAlertComponent } from './user-module/alerts/info-alert/info-alert.component';
import { ServeUserComponent } from './user-module/alerts/serve-user/serve-user.component';
// import { SpinnerComponent } from './shared/spinner/spinner.component';
import { SpinnerComponent } from './user-module/spinner/spinner.component'


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'employee', component: EmployeeFirstPageComponent },
  { path: '', component: LandingPageComponent },
  { path: '', component: LandingPageComponent },
  { path: 'userlocation', component: UserLocationComponent },
  { path: 'companylisting/:cityId', component: ComapanyListingComponent },
  { path: 'companyBranch/:companyId', component: CompanyBranchComponent },
  { path: 'companyServices/:branchId', component: CompanyServicesComponent },
  { path: 'ticket', component: UserTicketComponent },
  { path: 'profile/history', component: HistoryComponent },
  { path: 'profile/location', component: LocationComponent },
  { path: 'warning', component: WarningComponent },
  { path: 'info-alert', component: InfoAlertComponent },
  { path: 'serve-user', component: ServeUserComponent },
  { path: 'spinner', component: SpinnerComponent },
  { path: 'spinner-user', component: SpinnerComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
