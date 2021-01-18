import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherEnrollmentsPendingPage } from './teacher-enrollments-pending.page';

describe('TeacherEnrollmentsPendingPage', () => {
  let component: TeacherEnrollmentsPendingPage;
  let fixture: ComponentFixture<TeacherEnrollmentsPendingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherEnrollmentsPendingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherEnrollmentsPendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
