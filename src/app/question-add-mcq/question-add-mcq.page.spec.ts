import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionAddMcqPage } from './question-add-mcq.page';

describe('QuestionAddMcqPage', () => {
  let component: QuestionAddMcqPage;
  let fixture: ComponentFixture<QuestionAddMcqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAddMcqPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionAddMcqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
