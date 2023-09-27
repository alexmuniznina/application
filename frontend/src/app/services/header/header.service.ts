import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private isAutenticated: BehaviorSubject<boolean>;
  private username: string;

  constructor() {
    this.isAutenticated = new BehaviorSubject<boolean>(false);
  }

  setAuthState(state: boolean): void {
    this.isAutenticated.next(state);
  }

  setUsername(name: string): void {
    this.username = name;
  }

  getAuthState(): Observable<boolean> {
    return this.isAutenticated.asObservable();
  }

  getUsername(): string {
    return this.username;
  }
}
