import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
  children?: MenuItem[];
  badge?: string | number;
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItem[] = [
    { 
      label: 'Dashboard', 
      icon: 'dashboard', 
      route: '/dashboard',
      badge: undefined
    },
    { 
      label: 'User Management', 
      icon: 'people', 
      route: '/users', 
      roles: ['ADMIN'],
      children: [
        { label: 'All Users', icon: 'list', route: '/users' },
        { label: 'Roles & Permissions', icon: 'admin_panel_settings', route: '/users/roles' },
        { label: 'Activity Log', icon: 'history', route: '/users/activity' }
      ]
    },
    { 
      label: 'Transactions', 
      icon: 'receipt_long', 
      route: '/transactions',
      badge: 12,
      children: [
        { label: 'All Transactions', icon: 'list', route: '/transactions' },
        { label: 'Pending', icon: 'schedule', route: '/transactions/pending' },
        { label: 'Failed', icon: 'error', route: '/transactions/failed' }
      ]
    },
    { 
      label: 'Reports', 
      icon: 'analytics', 
      route: '/reports',
      children: [
        { label: 'Report Builder', icon: 'build', route: '/reports/builder' },
        { label: 'Saved Reports', icon: 'bookmark', route: '/reports/saved' },
        { label: 'Scheduled Reports', icon: 'schedule', route: '/reports/scheduled' }
      ]
    },
    { 
      label: 'Settings', 
      icon: 'settings', 
      route: '/settings',
      roles: ['ADMIN', 'MANAGER']
    }
  ];

  currentUser$: Observable<any>;
  activeRoute$: Observable<string>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.activeRoute$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: any) => event.urlAfterRedirects)
    );
  }

  ngOnInit(): void {
    // Expand menu items based on current route
    this.activeRoute$.subscribe(url => {
      this.menuItems.forEach(item => {
        if (item.children) {
          item.expanded = item.children.some(child => url.startsWith(child.route));
        }
      });
    });
  }

  hasPermission(item: MenuItem): boolean {
    if (!item.roles || item.roles.length === 0) {
      return true;
    }
    const user = this.authService.currentUserValue;
    if (!user) return false;
    return item.roles.some(role => user.roles.includes(role));
  }

  toggleExpanded(item: MenuItem): void {
    if (item.children && item.children.length > 0) {
      item.expanded = !item.expanded;
    }
  }

  isActive(item: MenuItem, currentUrl: string): boolean {
    if (item.route === currentUrl) return true;
    if (item.children) {
      return item.children.some(child => currentUrl.startsWith(child.route));
    }
    return false;
  }
}
