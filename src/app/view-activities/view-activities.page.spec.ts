import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewActivitiesPage } from './view-activities.page';

describe('ViewActivitiesPage', () => {
  let component: ViewActivitiesPage;
  let fixture: ComponentFixture<ViewActivitiesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewActivitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
