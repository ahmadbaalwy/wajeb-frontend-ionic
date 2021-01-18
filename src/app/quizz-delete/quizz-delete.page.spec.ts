import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizzDeletePage } from './quizz-delete.page';

describe('QuizzDeletePage', () => {
  let component: QuizzDeletePage;
  let fixture: ComponentFixture<QuizzDeletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzDeletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzDeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
