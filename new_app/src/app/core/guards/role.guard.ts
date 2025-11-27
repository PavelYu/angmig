import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export interface RoleGuardData {
  roles: string[];
  requireAll?: boolean; // If true, user must have ALL roles; if false, user needs ANY role
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuard  {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // First check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      return this.router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }
      });
    }

    // Get required roles from route data
    const routeData = route.data as RoleGuardData;
    const requiredRoles = routeData?.roles || [];

    // If no roles specified, allow access (fallback to AuthGuard)
    if (requiredRoles.length === 0) {
      return true;
    }

    const user = this.authService.currentUserValue;
    if (!user) {
      return this.router.createUrlTree(['/unauthorized']);
    }

    // Check role requirements
    const requireAll = routeData.requireAll ?? false;
    const hasAccess = requireAll
      ? requiredRoles.every(role => this.authService.hasRole(role))
      : requiredRoles.some(role => this.authService.hasRole(role));

    if (hasAccess) {
      return true;
    }

    // User doesn't have required role(s)
    return this.router.createUrlTree(['/unauthorized'], {
      queryParams: { 
        requiredRoles: requiredRoles.join(','),
        userRoles: user.roles.join(',')
      }
    });
  }
}

