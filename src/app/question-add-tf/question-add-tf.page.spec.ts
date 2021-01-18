import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionAddTfPage } from './question-add-tf.page';

describe('QuestionAddTfPage', () => {
  let component: QuestionAddTfPage;
  let fixture: ComponentFixture<QuestionAddTfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAddTfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionAddTfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
