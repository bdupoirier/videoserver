import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeSliderComponent } from './youtube-slider.component';

describe('YoutubeSliderComponent', () => {
  let component: YoutubeSliderComponent;
  let fixture: ComponentFixture<YoutubeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
