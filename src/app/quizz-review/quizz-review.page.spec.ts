import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizzReviewPage } from './quizz-review.page';

describe('QuizzReviewPage', () => {
  let component: QuizzReviewPage;
  let fixture: ComponentFixture<QuizzReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzReviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
