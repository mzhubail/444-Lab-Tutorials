import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddLaptopPage } from './add-laptop.page';

describe('AddLaptopPage', () => {
  let component: AddLaptopPage;
  let fixture: ComponentFixture<AddLaptopPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddLaptopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
