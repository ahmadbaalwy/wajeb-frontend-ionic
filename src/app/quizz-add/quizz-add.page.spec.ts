import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizzAddPage } from './quizz-add.page';

describe('QuizzAddPage', () => {
  let component: QuizzAddPage;
  let fixture: ComponentFixture<QuizzAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
