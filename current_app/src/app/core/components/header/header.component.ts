import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { NotificationService, Notification } from '../../services/notification.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  currentUser$: Observable<User | null>;
  isDark$: Observable<boolean>;
  notifications$: Observable<Notification[]>;
  unreadCount$: Observable<number>;
  
  searchControl = new FormControl('');
  searchResults$: Observable<any[]>;
  showSearchResults = false;
  showNotifications = false;
  showUserMenu = false;

  private notificationsSubject = new BehaviorSubject<Notification[]>([]);

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.isDark$ = this.themeService.isDark$;
    this.notifications$ = this.notificationsSubject.asObservable();
    this.unreadCount$ = this.notifications$.pipe(
      map(notifications => notifications.filter(n => !n.read).length)
    );

    // Mock search results
    this.searchResults$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(query => {
        if (!query || query.length < 2) return [];
        // Mock search results
        return [
          { type: 'user', label: `User: ${query}`, route: `/users?search=${query}` },
          { type: 'report', label: `Report: ${query}`, route: `/reports?search=${query}` },
          { type: 'transaction', label: `Transaction: ${query}`, route: `/transactions?search=${query}` }
        ];
      })
    );
  }

  ngOnInit(): void {
    // Subscribe to notifications
    this.notificationService.notifications$.subscribe(notification => {
      const current = this.notificationsSubject.value;
      this.notificationsSubject.next([notification, ...current].slice(0, 50));
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSearchResultClick(result: any): void {
    this.router.navigate([result.route]);
    this.showSearchResults = false;
    this.searchControl.setValue('');
  }

  markNotificationAsRead(notification: Notification): void {
    const current = this.notificationsSubject.value;
    const updated = current.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    );
    this.notificationsSubject.next(updated);
  }

  clearAllNotifications(): void {
    this.notificationsSubject.next([]);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
    this.showUserMenu = false;
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
    this.showUserMenu = false;
  }
}
