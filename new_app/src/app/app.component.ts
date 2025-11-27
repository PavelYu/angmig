import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { ThemeService } from './core/services/theme.service';
import { NotificationService } from './core/services/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'Enterprise Angular Application';

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Initialize global services
    // Auth service will check for existing session
    // Theme service will apply saved theme preference
    // Notification service will start polling/websocket connection
    this.notificationService.notifications$.subscribe();
  }
}
