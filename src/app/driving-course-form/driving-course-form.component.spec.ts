import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingCourseFormComponent } from './driving-course-form.component';

describe('DrivingCourseFormComponent', () => {
  let component: DrivingCourseFormComponent;
  let fixture: ComponentFixture<DrivingCourseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrivingCourseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivingCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
