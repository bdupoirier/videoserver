import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RssHomeComponent } from './rss-home.component';

describe('RssHomeComponent', () => {
  let component: RssHomeComponent;
  let fixture: ComponentFixture<RssHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
