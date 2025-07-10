import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockModalComponent } from './clock-modal.component';

describe('ClockModalComponent', () => {
  let component: ClockModalComponent;
  let fixture: ComponentFixture<ClockModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
