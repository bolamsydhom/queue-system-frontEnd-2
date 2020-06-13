import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeUserComponent } from './serve-user.component';

describe('ServeUserComponent', () => {
  let component: ServeUserComponent;
  let fixture: ComponentFixture<ServeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServeUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
