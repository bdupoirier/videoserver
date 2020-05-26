import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VimeoSliderComponent } from './vimeo-slider.component';

describe('VimeoSliderComponent', () => {
  let component: VimeoSliderComponent;
  let fixture: ComponentFixture<VimeoSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VimeoSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VimeoSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
