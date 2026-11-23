import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchForm } from './launch-form';

describe('LaunchForm', () => {
  let component: LaunchForm;
  let fixture: ComponentFixture<LaunchForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunchForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
