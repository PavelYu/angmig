import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  public notifications$ = this.notificationSubject.asObservable();

  constructor() {
    // Simulate incoming notifications
    setInterval(() => {
      this.notificationSubject.next({
        id: Math.random().toString(36).substr(2, 9),
        message: 'New system alert received',
        type: 'info',
        timestamp: new Date()
      });
    }, 30000);
  }
}
