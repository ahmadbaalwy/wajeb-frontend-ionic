import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizzEditPage } from './quizz-edit.page';

describe('QuizzEditPage', () => {
  let component: QuizzEditPage;
  let fixture: ComponentFixture<QuizzEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
