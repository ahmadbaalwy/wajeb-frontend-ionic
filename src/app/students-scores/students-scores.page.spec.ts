import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentsScoresPage } from './students-scores.page';

describe('StudentsScoresPage', () => {
  let component: StudentsScoresPage;
  let fixture: ComponentFixture<StudentsScoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsScoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsScoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
