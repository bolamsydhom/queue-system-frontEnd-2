import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerToggle } from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import { MatAutocompleteModule, } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSliderModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatTreeModule,
    MatGridListModule,
    MatStepperModule,
    MatTableModule,
    MatSelectModule,
    MatChipsModule,
    MatListModule


  ],
  exports: [
    MatButtonModule,
    MatSliderModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatTreeModule,
    MatGridListModule,
    MatStepperModule,
    MatTableModule,
    MatSelectModule,
    MatChipsModule,
    MatListModule



  ]
})
export class MaterialModule { }
