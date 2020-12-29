import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CourseDeletePage } from './course-delete.page';

describe('CourseDeletePage', () => {
  let component: CourseDeletePage;
  let fixture: ComponentFixture<CourseDeletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDeletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
