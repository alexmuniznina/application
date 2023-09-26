import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  private isEnabled: BehaviorSubject<boolean>;

  constructor() {
    this.isEnabled = new BehaviorSubject<boolean>(false);
  }

  setEnabled(state: boolean): void {
    this.isEnabled.next(state);
  }

  getEnabled(): Observable<boolean> {
    return this.isEnabled.asObservable();
  }
}
