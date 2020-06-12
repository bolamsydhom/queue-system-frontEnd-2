import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MaterialModule } from '../material.module';
import { User } from '../_service/user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LandingPageComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [User, HttpClientModule, HttpClient]
})
export class SharedModule { }
