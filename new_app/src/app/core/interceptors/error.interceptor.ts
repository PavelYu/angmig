import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getReasonPhrase, getStatusCode } from 'http-status-codes';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        let errorType: 'info' | 'warning' | 'error' = 'error';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
          errorType = 'error';
        } else {
          // Server-side error
          const statusCode = error.status;
          const reasonPhrase = getReasonPhrase(statusCode);
          
          // Customize error messages based on status code
          switch (statusCode) {
            case 400:
              errorMessage = error.error?.message || 'Bad Request: Invalid data provided';
              errorType = 'warning';
              break;
            case 401:
              errorMessage = 'Unauthorized: Please log in';
              errorType = 'warning';
              break;
            case 403:
              errorMessage = 'Forbidden: You do not have permission to access this resource';
              errorType = 'warning';
              break;
            case 404:
              errorMessage = 'Not Found: The requested resource was not found';
              errorType = 'info';
              break;
            case 500:
              errorMessage = 'Server Error: Please try again later';
              errorType = 'error';
              break;
            case 503:
              errorMessage = 'Service Unavailable: The server is temporarily unavailable';
              errorType = 'error';
              break;
            default:
              errorMessage = error.error?.message || `${statusCode} ${reasonPhrase}`;
          }
        }

        // Log error for debugging
        console.error('HTTP Error:', {
          url: req.url,
          status: error.status,
          message: errorMessage,
          error: error.error
        });

        // Send notification to user
        this.notificationService.sendNotification({
          message: errorMessage,
          type: errorType,
          category: 'system'
        });

        return throwError(() => error);
      })
    );
  }
}

