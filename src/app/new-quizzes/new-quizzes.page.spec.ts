import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewQuizzesPage } from './new-quizzes.page';

describe('NewQuizzesPage', () => {
  let component: NewQuizzesPage;
  let fixture: ComponentFixture<NewQuizzesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuizzesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewQuizzesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
