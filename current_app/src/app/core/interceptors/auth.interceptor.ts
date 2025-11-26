import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private publicRoutes = ['/api/auth/login', '/api/auth/register', '/api/public'];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip adding token for public routes
    if (this.isPublicRoute(req.url)) {
      return next.handle(req);
    }

    // Get token from localStorage (in real app, this would come from AuthService)
    const token = localStorage.getItem('auth_token') || 'mock-jwt-token';

    // Clone request and add Authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(authReq).pipe(
      catchError((error) => {
        // Handle 401 Unauthorized - token expired or invalid
        if (error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private isPublicRoute(url: string): boolean {
    return this.publicRoutes.some(route => url.includes(route));
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Attempt to refresh token
    return this.authService.refreshToken().pipe(
      switchMap((user) => {
        // Retry original request with new token
        const newToken = localStorage.getItem('auth_token') || 'refreshed-token';
        const retryReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${newToken}`
          }
        });
        return next.handle(retryReq);
      }),
      catchError((error) => {
        // Refresh failed, redirect to login
        this.authService.logout();
        this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }
}

