import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryAboutComponent } from './country-about.component';

describe('CountryAboutComponent', () => {
  let component: CountryAboutComponent;
  let fixture: ComponentFixture<CountryAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
