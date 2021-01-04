import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassroomDeletePage } from './classroom-delete.page';

describe('ClassroomDeletePage', () => {
  let component: ClassroomDeletePage;
  let fixture: ComponentFixture<ClassroomDeletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomDeletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassroomDeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
