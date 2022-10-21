import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionBracketeerComponent } from './session-bracketeer.component';

describe('SessionBracketeerComponent', () => {
  let component: SessionBracketeerComponent;
  let fixture: ComponentFixture<SessionBracketeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionBracketeerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionBracketeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
