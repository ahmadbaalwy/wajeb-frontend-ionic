import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizzTeacherMainPage } from './quizz-teacher-main.page';

describe('QuizzTeacherMainPage', () => {
  let component: QuizzTeacherMainPage;
  let fixture: ComponentFixture<QuizzTeacherMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzTeacherMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzTeacherMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
