import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CitiesService } from './../../_service/cities.service';
import { AreaService } from './../../_service/area.service';
import { User } from './../../_service/user.service';
import { Router } from '@angular/router';
import { City } from './../../_model/city';
import { TicketService } from 'src/app/_service/ticket.service';

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.scss']
})
export class UserLocationComponent implements OnInit {
  cities: City[] = [];
  cityNameSelectedByInput: String = '';
  isChecked = false;
  isNew = true;
  dropdownIsOpen = false;
  arrAreaOfCity: {}[] = [];
  area = '';
  imgSrc = '../../../assets/images/arrow1.png';
  c;
  cityIdURL;
  @ViewChild('nextScreen') arrow: ElementRef;

  constructor(
    private CitiesService: CitiesService,
    private AreaService: AreaService,
    private ticketService:TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.CitiesService.getAllCities().subscribe(data => {
      this.c = data;
    });
  }
  ngDoCheck() {
    if (this.cityNameSelectedByInput !== '') {
      let city = this.c.filter(c => c.name === this.cityNameSelectedByInput);
      this.arrAreaOfCity = this.AreaService.getById(city[0].id);
      this.imgSrc = '../../../assets/images/arrow2.png';
      this.arrow.nativeElement.style.cursor = 'pointer';
    }
  }

  onSearchChange(srchValue: string, btn): void {
    let searchRes;
    this.isNew =
      this.cities.filter(c => c.cityName === this.cityNameSelectedByInput)
        .length > 0
        ? false
        : true;
    if ((srchValue !== '' && !this.isChecked) || this.isNew) {
      searchRes = this.c.filter(city =>
        city.name.toLowerCase().includes(srchValue)
      );
      this.cities = searchRes;
    } else {
      this.cities = [];
      this.area = '';
      btn.innerHTML = 'Select Area';
      this.arrAreaOfCity = [];
      this.cityNameSelectedByInput = '';
      btn.style.background = ' #f1f1f1';
      btn.style.color = 'rgb(80, 78, 78)';
      btn.onmousemove = function() {
        this.style.backgroundColor = '#3FB0AC';
      };
      this.imgSrc = '../../../assets/images/arrow1.png';
      this.arrow.nativeElement.style.cursor = 'not-allowed';
    }
  }
  onSelectByInput(city) {
    this.cityIdURL=city.id;
    this.cityNameSelectedByInput = city.name;
    this.ticketService.postUserData('city', city);
    console.log(this.cityIdURL)
    this.ticketService.postUserData('cityId', this.cityIdURL);
    this.isChecked = true;
    this.cities = [];
  }

  onSelectByDropdown(area, btn) {
    this.ticketService.postUserData('areaId', area.id);
    this.ticketService.postUserData('area', area);
    this.area = area.name;
    btn.innerHTML = this.area;
    btn.style.background = '#173E43';
    btn.style.color = 'white';
    this.dropdownIsOpen = false;
  }
  toggleOpen() {
    this.dropdownIsOpen = !this.dropdownIsOpen;
  }
  onclick() {
    if (this.cityNameSelectedByInput !== '') {
      this.router.navigate(['/companylisting',this.cityIdURL]);
    }
  }
}
