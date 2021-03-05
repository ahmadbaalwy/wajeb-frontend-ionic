import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginGooglePage } from './login-google.page';

describe('LoginGooglePage', () => {
  let component: LoginGooglePage;
  let fixture: ComponentFixture<LoginGooglePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginGooglePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginGooglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
