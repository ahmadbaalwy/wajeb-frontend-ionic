import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherEnrollmentsApprovedPage } from './teacher-enrollments-approved.page';

describe('TeacherEnrollmentsApprovedPage', () => {
  let component: TeacherEnrollmentsApprovedPage;
  let fixture: ComponentFixture<TeacherEnrollmentsApprovedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherEnrollmentsApprovedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherEnrollmentsApprovedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
