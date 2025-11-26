import { Component } from '@angular/core';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'User Management', icon: 'people', route: '/users', roles: ['ADMIN'] },
    { label: 'Transactions', icon: 'receipt_long', route: '/transactions' },
    { label: 'Reports', icon: 'analytics', route: '/reports' },
    { label: 'Settings', icon: 'settings', route: '/settings' }
  ];
}
