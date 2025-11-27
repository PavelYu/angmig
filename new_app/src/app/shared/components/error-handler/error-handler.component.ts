import { Component, Input, OnInit } from '@angular/core';
import { getReasonPhrase } from 'http-status-codes';

export interface ErrorDetails {
  statusCode?: number;
  message?: string;
  error?: any;
  url?: string;
}

@Component({
    selector: 'app-error-handler',
    templateUrl: './error-handler.component.html',
    styleUrls: ['./error-handler.component.scss'],
    standalone: false
})
export class ErrorHandlerComponent implements OnInit {
  @Input() error: ErrorDetails | null = null;
  @Input() showDetails = false;

  errorMessage = 'An error occurred';
  statusPhrase = '';
  statusCode: number | null = null;

  ngOnInit(): void {
    if (this.error) {
      this.statusCode = this.error.statusCode || null;
      
      if (this.statusCode) {
        try {
          this.statusPhrase = getReasonPhrase(this.statusCode);
        } catch (e) {
          this.statusPhrase = 'Unknown Status';
        }
      }

      this.errorMessage = this.error.message || this.statusPhrase || 'An error occurred';
    }
  }

  getStatusClass(): string {
    if (!this.statusCode) return 'error-unknown';
    
    if (this.statusCode >= 500) return 'error-server';
    if (this.statusCode >= 400) return 'error-client';
    return 'error-unknown';
  }

  getIcon(): string {
    if (!this.statusCode) return 'error_outline';
    
    if (this.statusCode >= 500) return 'dns';
    if (this.statusCode === 404) return 'search_off';
    if (this.statusCode === 403) return 'lock';
    if (this.statusCode === 401) return 'login';
    return 'error_outline';
  }

  reloadPage(): void {
    window.location.reload();
  }
}

