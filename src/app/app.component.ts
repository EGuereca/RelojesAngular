import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClockModalComponent } from './clock-modal/clock-modal.component';
import { ClockService } from './services/Clock.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ClockComponentComponent } from './clock-component/clock-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ClockModalComponent,
    ClockComponentComponent,
    MatIconModule,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private dialog: MatDialog,
    private clockService: ClockService
  ) {}

  openCreateClock() {
    this.clockService.setEditingClock(null); 
    this.dialog.open(ClockModalComponent);   
  }
}
