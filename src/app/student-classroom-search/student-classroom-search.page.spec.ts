import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentClassroomSearchPage } from './student-classroom-search.page';

describe('StudentClassroomSearchPage', () => {
  let component: StudentClassroomSearchPage;
  let fixture: ComponentFixture<StudentClassroomSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentClassroomSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentClassroomSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
