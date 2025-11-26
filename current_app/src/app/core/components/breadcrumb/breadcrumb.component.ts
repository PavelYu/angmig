import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';

export interface BreadcrumbItem {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    distinctUntilChanged(),
    map(() => this.buildBreadcrumb(this.activatedRoute.root))
  );

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  private buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbItem[] = []): BreadcrumbItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'] || this.getLabelFromUrl(routeURL);
      if (label && label !== 'Home') {
        breadcrumbs.push({ label, url });
      }

      return this.buildBreadcrumb(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  private getLabelFromUrl(url: string): string {
    if (!url) return '';
    
    // Convert URL segments to readable labels
    const labelMap: { [key: string]: string } = {
      'dashboard': 'Dashboard',
      'users': 'Users',
      'transactions': 'Transactions',
      'reports': 'Reports',
      'settings': 'Settings',
      'builder': 'Report Builder',
      'saved': 'Saved Reports',
      'scheduled': 'Scheduled Reports',
      'roles': 'Roles & Permissions',
      'activity': 'Activity Log',
      'pending': 'Pending',
      'failed': 'Failed'
    };

    const segments = url.split('/');
    const lastSegment = segments[segments.length - 1];
    return labelMap[lastSegment] || this.capitalizeFirst(lastSegment);
  }

  private capitalizeFirst(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
  }
}
