import { TestBed } from '@angular/core/testing';

import { ChanceService } from './chance.service';

describe('ChanceService', () => {
  let service: ChanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
