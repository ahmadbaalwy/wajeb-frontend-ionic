import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassroomStudentMainPage } from './classroom-student-main.page';

describe('ClassroomStudentMainPage', () => {
  let component: ClassroomStudentMainPage;
  let fixture: ComponentFixture<ClassroomStudentMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomStudentMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassroomStudentMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
