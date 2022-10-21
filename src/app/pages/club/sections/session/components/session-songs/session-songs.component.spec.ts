import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSongsComponent } from './session-songs.component';

describe('SessionSongsComponent', () => {
  let component: SessionSongsComponent;
  let fixture: ComponentFixture<SessionSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionSongsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
