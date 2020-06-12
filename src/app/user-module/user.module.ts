import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



import { MaterialModule } from '../material.module';
import { ComapanyListingComponent } from './company/comapany-listing/comapany-listing.component';
import { UserHeaderComponent } from './user-header/user-header.component';

import { UserLocationComponent } from './user-location/user-location.component';

import { CitiesService } from '../_service/cities.service';
import { AreaService } from '../_service/area.service';
import { BranchService } from '../_service/branch.service';

import { CompanyServicesComponent } from './company/company-services/company-services.component';
import { CompanyBranchComponent } from './company/company-branch/company-branch.component';
import { UserTicketComponent } from './user-ticket/user-ticket.component';
import { TicketService } from '../_service/ticket.service';




@NgModule({

  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  providers: [CitiesService,AreaService,BranchService,TicketService],
  exports: [ MaterialModule],
  declarations: [ComapanyListingComponent, UserHeaderComponent, UserLocationComponent, CompanyServicesComponent, CompanyBranchComponent, UserTicketComponent]
})
export class UserModule { }
