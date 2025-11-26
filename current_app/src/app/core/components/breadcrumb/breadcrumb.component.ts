import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">{{ currentRoute }}</li>
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb { display: flex; list-style: none; padding: 10px 0; margin: 0; }
    .breadcrumb-item + .breadcrumb-item::before { content: "/"; padding: 0 8px; color: #6c757d; }
    .breadcrumb-item a { text-decoration: none; color: #007bff; }
    .breadcrumb-item.active { color: #6c757d; }
  `]
})
export class BreadcrumbComponent {
  currentRoute = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.urlAfterRedirects.split('/').pop() || 'Dashboard';
    });
  }
}
