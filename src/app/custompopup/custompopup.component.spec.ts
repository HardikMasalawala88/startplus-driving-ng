import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustompopupComponent } from './custompopup.component';

describe('CustompopupComponent', () => {
  let component: CustompopupComponent;
  let fixture: ComponentFixture<CustompopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustompopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustompopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
