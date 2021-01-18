import { TestBed } from '@angular/core/testing';

import { QuizzAnswerService } from './quizz-answer.service';

describe('QuizzAnswerService', () => {
  let service: QuizzAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizzAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
