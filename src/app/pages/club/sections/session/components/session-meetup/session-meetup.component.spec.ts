import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionMeetupComponent } from './session-meetup.component';

describe('SessionMeetupComponent', () => {
  let component: SessionMeetupComponent;
  let fixture: ComponentFixture<SessionMeetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionMeetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionMeetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
