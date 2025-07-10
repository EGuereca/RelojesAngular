import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockComponentComponent } from './clock-component.component';

describe('ClockComponentComponent', () => {
  let component: ClockComponentComponent;
  let fixture: ComponentFixture<ClockComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
