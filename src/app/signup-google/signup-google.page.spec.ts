import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignupGooglePage } from './signup-google.page';

describe('SignupGooglePage', () => {
  let component: SignupGooglePage;
  let fixture: ComponentFixture<SignupGooglePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupGooglePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupGooglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
