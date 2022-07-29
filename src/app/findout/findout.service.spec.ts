import { TestBed } from '@angular/core/testing';

import { FindoutService } from './findout.service';

describe('FindoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FindoutService = TestBed.get(FindoutService);
    expect(service).toBeTruthy();
  });
});
