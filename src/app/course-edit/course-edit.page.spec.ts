import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CourseEditPage } from './course-edit.page';

describe('CourseEditPage', () => {
  let component: CourseEditPage;
  let fixture: ComponentFixture<CourseEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
