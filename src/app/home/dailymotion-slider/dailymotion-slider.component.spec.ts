import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailymotionSliderComponent } from './dailymotion-slider.component';

describe('DailymotionSliderComponent', () => {
  let component: DailymotionSliderComponent;
  let fixture: ComponentFixture<DailymotionSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailymotionSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailymotionSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
