import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassroomTeacherMainPage } from './classroom-teacher-main.page';

describe('ClassroomTeacherMainPage', () => {
  let component: ClassroomTeacherMainPage;
  let fixture: ComponentFixture<ClassroomTeacherMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomTeacherMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassroomTeacherMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
