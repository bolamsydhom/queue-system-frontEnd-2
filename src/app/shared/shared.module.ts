import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MaterialModule } from '../material.module';
import { User } from '../_service/user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { AppRoutingModule } from '../app-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    SpinnerComponent,
    ErrorPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [User, HttpClientModule, HttpClient]
})
export class SharedModule { }
