import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewParticipantsPage } from './view-participants.page';

describe('ViewParticipantsPage', () => {
  let component: ViewParticipantsPage;
  let fixture: ComponentFixture<ViewParticipantsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewParticipantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
