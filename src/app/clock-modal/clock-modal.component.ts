import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClockService } from '../services/Clock.service';
import { Clock } from '../models/Clock.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-clock-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule
],
  templateUrl: './clock-modal.component.html',
  styleUrl: './clock-modal.component.scss'
})
export class ClockModalComponent implements OnInit {
  clockForm!: FormGroup;
  isEditMode = false;
  editingClock: Clock | null = null;

  constructor(
    private fb: FormBuilder,
    private clockService: ClockService,
    private dialogRef: MatDialogRef<ClockModalComponent>
  ) {}

  ngOnInit(): void {
    this.editingClock = this.clockService.getEditingClock();
    this.isEditMode = !!this.editingClock;

    // Formatea startTime a 'HH:mm:ss' si existe, si no, usa la hora actual
    const startTimeString = this.editingClock
      ? this.editingClock.startTime.toTimeString().slice(0, 8)
      : new Date().toTimeString().slice(0, 8);

    this.clockForm = this.fb.group({
      handColor: [this.editingClock?.handColor || '#000000', Validators.required],
      markerColor: [this.editingClock?.markerColor || '#000000', Validators.required],
      borderColor: [this.editingClock?.borderColor || '#000000', Validators.required],
      analogNumbersColor: [this.editingClock?.analogNumbersColor || '#000000', Validators.required],
      digitalNumbersColor: [this.editingClock?.digitalNumbersColor || '#000000', Validators.required],
      backgroundImage: [this.editingClock?.backgroundImage || ''],
      startTime: [startTimeString, Validators.required]
    });
  }

  onSave(): void {
  if (this.clockForm.invalid) return;

  const formValue = this.clockForm.value;

  const config: Omit<Clock, 'id' | 'backgroundImage'> = {
    handColor: formValue.handColor,
    markerColor: formValue.markerColor,
    borderColor: formValue.borderColor,
    analogNumbersColor: formValue.analogNumbersColor,
    digitalNumbersColor: formValue.digitalNumbersColor,
    startTime: new Date(`1970-01-01T${formValue.startTime}`)
  };

  // Si quieres incluir backgroundImage como en tu modelo:
  const fullConfig = {
    ...config,
    backgroundImage: formValue.backgroundImage || ''
  };

  if (this.isEditMode && this.editingClock) {
    this.clockService.updateClock(this.editingClock.id, fullConfig);
  } else {
    this.clockService.addClock(fullConfig);
  }

  this.clockService.setEditingClock(null);
  this.dialogRef.close();
}


  onCancel(): void {
    this.clockService.setEditingClock(null); // limpiar estado
    this.dialogRef.close();
  }
}
