import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAutenticated: BehaviorSubject<boolean>;

  constructor() {
    this.isAutenticated = new BehaviorSubject<boolean>(false);
  }

  setAuthState(state: boolean): void {
    this.isAutenticated.next(state);
  }

  getAuthState(): Observable<boolean> {
    return this.isAutenticated.asObservable();
  }
}
