import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldComponentComponent } from './world-component.component';

describe('WorldComponentComponent', () => {
  let component: WorldComponentComponent;
  let fixture: ComponentFixture<WorldComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
