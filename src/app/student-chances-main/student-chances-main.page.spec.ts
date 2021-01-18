import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentChancesMainPage } from './student-chances-main.page';

describe('StudentChancesMainPage', () => {
  let component: StudentChancesMainPage;
  let fixture: ComponentFixture<StudentChancesMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentChancesMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentChancesMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
