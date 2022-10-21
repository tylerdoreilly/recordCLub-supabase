import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsNavComponent } from './clubs-nav.component';

describe('ClubsNavComponent', () => {
  let component: ClubsNavComponent;
  let fixture: ComponentFixture<ClubsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubsNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
