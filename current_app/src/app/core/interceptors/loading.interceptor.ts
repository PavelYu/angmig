import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip loading indicator for certain requests (e.g., polling, background sync)
    if (this.shouldSkipLoading(req)) {
      return next.handle(req);
    }

    // Show loading indicator
    this.activeRequests++;
    if (this.activeRequests === 1) {
      this.loadingService.show();
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          // Small delay to prevent flickering on rapid requests
          setTimeout(() => {
            this.loadingService.hide();
          }, 100);
        }
      })
    );
  }

  private shouldSkipLoading(req: HttpRequest<any>): boolean {
    // Skip loading for polling endpoints, health checks, etc.
    const skipPatterns = [
      '/api/health',
      '/api/ping',
      '/api/poll'
    ];
    
    return skipPatterns.some(pattern => req.url.includes(pattern));
  }
}

