import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionGroupComponent } from './session-group.component';

describe('SessionGroupComponent', () => {
  let component: SessionGroupComponent;
  let fixture: ComponentFixture<SessionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
