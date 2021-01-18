import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizzListPage } from './quizz-list.page';

describe('QuizzListPage', () => {
  let component: QuizzListPage;
  let fixture: ComponentFixture<QuizzListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
