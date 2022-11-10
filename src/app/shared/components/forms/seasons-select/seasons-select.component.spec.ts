import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsSelectComponent } from './seasons-select.component';

describe('SeasonsSelectComponent', () => {
  let component: SeasonsSelectComponent;
  let fixture: ComponentFixture<SeasonsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeasonsSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
