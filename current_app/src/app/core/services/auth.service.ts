import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  id: string;
  username: string;
  roles: string[];
  avatarUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Mock initial user
    this.currentUserSubject.next({
      id: '1',
      username: 'admin_user',
      roles: ['ADMIN', 'EDITOR']
    });
  }

  login(username: string, password: string): Observable<User> {
    // Mock login API call
    return of({
      id: '1',
      username,
      roles: ['ADMIN']
    }).pipe(
      delay(1000),
      tap(user => this.currentUserSubject.next(user))
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.roles.includes(role) : false;
  }
}
