import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import { ClockService } from '../services/Clock.service';
import { Clock } from '../models/Clock.model';
import { ClockModalComponent } from '../clock-modal/clock-modal.component';

@Component({
  selector: 'app-clock-component',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ClockModalComponent
  ],
  templateUrl: './clock-component.component.html',
  styleUrl: './clock-component.component.scss'
})
export class ClockComponentComponent implements OnInit, OnDestroy {
  clocks: Clock[] = [];
  private subscription?: Subscription;
  private clockSubscription?: Subscription;

  constructor(
    private clockService: ClockService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // Subscribe to clock changes
    this.clockSubscription = this.clockService.clocks$.subscribe(clocks => {
      this.clocks = clocks;
    });

    this.subscription = interval(1000).subscribe(() => {
      this.clocks.forEach(clock => {
        clock.startTime = new Date(clock.startTime.getTime() + 1000);
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.clockSubscription) {
      this.clockSubscription.unsubscribe();
    }
  }

  getHourTransform(clock: Clock): string {
    const hours = clock.startTime.getHours() % 12;
    const minutes = clock.startTime.getMinutes();
    const degrees = (hours * 30) + (minutes * 0.5);
    return `rotate(${degrees}deg)`;
  }

  getMinuteTransform(clock: Clock): string {
    const minutes = clock.startTime.getMinutes();
    const seconds = clock.startTime.getSeconds();
    const degrees = (minutes * 6) + (seconds * 0.1);
    return `rotate(${degrees}deg)`;
  }

  getSecondTransform(clock: Clock): string {
    const seconds = clock.startTime.getSeconds();
    const degrees = seconds * 6;
    return `rotate(${degrees}deg)`;
  }

  formatTime(clock: Clock): string {
    return clock.startTime.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  editClock(clock: Clock) {
    this.clockService.setEditingClock(clock);
    this.dialog.open(ClockModalComponent)
  }

  deleteClock(clock: Clock) {
    this.clockService.deleteClock(clock.id);
  }

  incrementSeconds(clock: Clock) {
    const newTime = new Date(clock.startTime.getTime() + 1000);
    this.clockService.updateClock(clock.id, { startTime: newTime });
  }

  decrementSeconds(clock: Clock) {
    const newTime = new Date(clock.startTime.getTime() - 1000);
    this.clockService.updateClock(clock.id, { startTime: newTime });
  }

  incrementMinutes(clock: Clock) {
    const newTime = new Date(clock.startTime.getTime() + 60000);
    this.clockService.updateClock(clock.id, { startTime: newTime });
  }

  decrementMinutes(clock: Clock) {
    const newTime = new Date(clock.startTime.getTime() - 60000);
    this.clockService.updateClock(clock.id, { startTime: newTime });
  }
  getNumberTransform(index: number): string {
    const angle = index * 30; // 30 grados por cada número (360/12)
    const radius = 80; // Radio desde el centro
    const x = Math.sin(angle * Math.PI / 180) * radius;
    const y = -Math.cos(angle * Math.PI / 180) * radius;
    return `translate(${x}px, ${y}px)`;
  }
}
