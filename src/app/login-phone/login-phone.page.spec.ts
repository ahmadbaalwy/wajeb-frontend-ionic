import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPhonePage } from './login-phone.page';

describe('LoginPhonePage', () => {
  let component: LoginPhonePage;
  let fixture: ComponentFixture<LoginPhonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPhonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
