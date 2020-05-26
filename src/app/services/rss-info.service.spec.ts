import { TestBed } from '@angular/core/testing';

import { RssInfoService } from './rss-info.service';

describe('RssInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RssInfoService = TestBed.get(RssInfoService);
    expect(service).toBeTruthy();
  });
});
