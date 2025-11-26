import { Injectable } from '@angular/core';
import { Subject, Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  timestamp: Date;
  read?: boolean;
  category?: 'system' | 'user' | 'transaction' | 'report';
  actionUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  public notifications$ = this.notificationSubject.asObservable();

  private mockNotifications = [
    { message: 'New user registration pending approval', type: 'info' as const, category: 'user' as const },
    { message: 'System maintenance scheduled for tonight', type: 'warning' as const, category: 'system' as const },
    { message: 'Failed transaction detected', type: 'error' as const, category: 'transaction' as const },
    { message: 'Monthly report generated successfully', type: 'info' as const, category: 'report' as const },
    { message: 'High volume of transactions detected', type: 'warning' as const, category: 'transaction' as const }
  ];

  constructor() {
    // Simulate incoming notifications with variety
    let notificationIndex = 0;
    interval(15000).subscribe(() => {
      const mock = this.mockNotifications[notificationIndex % this.mockNotifications.length];
      this.notificationSubject.next({
        id: Math.random().toString(36).substr(2, 9),
        message: mock.message,
        type: mock.type,
        category: mock.category,
        timestamp: new Date(),
        read: false
      });
      notificationIndex++;
    });
  }

  sendNotification(notification: Omit<Notification, 'id' | 'timestamp'>): void {
    this.notificationSubject.next({
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    });
  }

  markAsRead(notificationId: string): void {
    // This would typically update a backend service
    // For now, it's handled in the component
  }
}

