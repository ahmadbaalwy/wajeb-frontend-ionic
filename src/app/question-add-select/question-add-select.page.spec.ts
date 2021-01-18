import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionAddSelectPage } from './question-add-select.page';

describe('QuestionAddSelectPage', () => {
  let component: QuestionAddSelectPage;
  let fixture: ComponentFixture<QuestionAddSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAddSelectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionAddSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
