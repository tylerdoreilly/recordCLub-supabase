import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresAddComponent } from './scores-add.component';

describe('ScoresAddComponent', () => {
  let component: ScoresAddComponent;
  let fixture: ComponentFixture<ScoresAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoresAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
