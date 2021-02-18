import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionTeacherPage } from './question-teacher.page';

describe('QuestionTeacherPage', () => {
  let component: QuestionTeacherPage;
  let fixture: ComponentFixture<QuestionTeacherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTeacherPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionTeacherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
