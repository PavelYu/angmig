import { Component } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentUser$: Observable<User | null>;
  isDark$: Observable<boolean>;

  constructor(private authService: AuthService, private themeService: ThemeService) {
    this.currentUser$ = this.authService.currentUser$;
    this.isDark$ = this.themeService.isDark$;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout();
  }
}
