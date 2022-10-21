import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColSpacerComponent } from './col-spacer.component';

describe('ColSpacerComponent', () => {
  let component: ColSpacerComponent;
  let fixture: ComponentFixture<ColSpacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColSpacerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColSpacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
