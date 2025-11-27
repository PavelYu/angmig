import { Component, Inject, TemplateRef } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface ToastConfig {
  message: string;
  action?: string;
  duration?: number;
  type?: 'success' | 'error' | 'warning' | 'info';
  horizontalPosition?: 'start' | 'center' | 'end' | 'left' | 'right';
  verticalPosition?: 'top' | 'bottom';
}

@Component({
    selector: 'app-toast-notification',
    templateUrl: './toast-notification.component.html',
    styleUrls: ['./toast-notification.component.scss'],
    standalone: false
})
export class ToastNotificationComponent {
  constructor(private snackBar: MatSnackBar) { }

  show(config: ToastConfig | string): void {
    if (typeof config === 'string') {
      this.snackBar.open(config, 'Close', { duration: 3000 });
      return;
    }

    const snackConfig: MatSnackBarConfig = {
      duration: config.duration || 3000,
      horizontalPosition: config.horizontalPosition || 'end',
      verticalPosition: config.verticalPosition || 'bottom',
      panelClass: [`toast-${config.type || 'info'}`]
    };

    this.snackBar.open(
      config.message,
      config.action || 'Close',
      snackConfig
    );
  }

  success(message: string, action?: string): void {
    this.show({ message, action, type: 'success' });
  }

  error(message: string, action?: string): void {
    this.show({ message, action, type: 'error', duration: 5000 });
  }

  warning(message: string, action?: string): void {
    this.show({ message, action, type: 'warning' });
  }

  info(message: string, action?: string): void {
    this.show({ message, action, type: 'info' });
  }
}
