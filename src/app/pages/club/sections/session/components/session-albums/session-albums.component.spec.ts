import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAlbumsComponent } from './session-albums.component';

describe('SessionAlbumsComponent', () => {
  let component: SessionAlbumsComponent;
  let fixture: ComponentFixture<SessionAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionAlbumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
