import { TestBed } from '@angular/core/testing';

import { ChanceAnswerService } from './chance-answer.service';

describe('ChanceAnswerService', () => {
  let service: ChanceAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChanceAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
