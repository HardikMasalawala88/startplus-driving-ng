import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartLearningBannerComponent } from './start-learning-banner.component';

describe('StartLearningBannerComponent', () => {
  let component: StartLearningBannerComponent;
  let fixture: ComponentFixture<StartLearningBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartLearningBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartLearningBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
