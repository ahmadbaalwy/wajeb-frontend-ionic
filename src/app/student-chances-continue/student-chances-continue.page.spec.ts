import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentChancesContinuePage } from './student-chances-continue.page';

describe('StudentChancesContinuePage', () => {
  let component: StudentChancesContinuePage;
  let fixture: ComponentFixture<StudentChancesContinuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentChancesContinuePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentChancesContinuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
