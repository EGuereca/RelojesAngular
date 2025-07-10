import { Clock } from "../models/Clock.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  private clocks: Clock[] = [];
  private clocksSubject = new BehaviorSubject<Clock[]>([]);
  private editingClockSubject = new BehaviorSubject<Clock | null>(null);

  clocks$ = this.clocksSubject.asObservable();
  editingClock$ = this.editingClockSubject.asObservable();

  addClock(config: Omit<Clock, 'id'>): void {
    const newClock: Clock = {
      ...config,
      id: this.generateId()
    };
    this.clocks.push(newClock);
    this.clocksSubject.next([...this.clocks]);
  }

  updateClock(id: string, config: Partial<Omit<Clock, 'id'>>): void {
    const index = this.clocks.findIndex(clock => clock.id === id);
    if (index !== -1) {
      this.clocks[index] = { ...this.clocks[index], ...config };
      this.clocksSubject.next([...this.clocks]);
    }
  }

  deleteClock(id: string): void {
    this.clocks = this.clocks.filter(clock => clock.id !== id);
    this.clocksSubject.next([...this.clocks]);
  }

  getClocks(): Clock[] {
    return [...this.clocks];
  }

  setEditingClock(clock: Clock | null): void {
    this.editingClockSubject.next(clock);
  }

  getEditingClock(): Clock | null {
    return this.editingClockSubject.value;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
