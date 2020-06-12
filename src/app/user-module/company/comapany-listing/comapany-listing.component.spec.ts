import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComapanyListingComponent } from './comapany-listing.component';

describe('ComapanyListingComponent', () => {
  let component: ComapanyListingComponent;
  let fixture: ComponentFixture<ComapanyListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComapanyListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComapanyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
