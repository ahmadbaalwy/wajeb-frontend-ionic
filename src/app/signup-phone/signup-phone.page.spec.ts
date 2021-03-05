import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignupPhonePage } from './signup-phone.page';

describe('SignupPhonePage', () => {
  let component: SignupPhonePage;
  let fixture: ComponentFixture<SignupPhonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPhonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupPhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
