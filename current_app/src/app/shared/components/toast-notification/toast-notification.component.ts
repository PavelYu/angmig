import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast-notification',
  template: '', // Logic only wrapper or could be a custom template
})
export class ToastNotificationComponent {
  constructor(private snackBar: MatSnackBar) { }

  show(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, { duration });
  }
}
