import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassroomAddCollegePage } from './classroom-add-college.page';

describe('ClassroomAddCollegePage', () => {
  let component: ClassroomAddCollegePage;
  let fixture: ComponentFixture<ClassroomAddCollegePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomAddCollegePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassroomAddCollegePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
