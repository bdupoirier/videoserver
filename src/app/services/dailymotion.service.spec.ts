import { TestBed } from '@angular/core/testing';

import { DailymotionService } from './dailymotion.service';

describe('DailymotionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailymotionService = TestBed.get(DailymotionService);
    expect(service).toBeTruthy();
  });
});
