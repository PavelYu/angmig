import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-report-viewer',
  template: `
    <div class="report-viewer">
      <div *ngIf="!reportContent" class="placeholder">
        <mat-icon>description</mat-icon>
        <p>No report generated yet.</p>
      </div>
      <div *ngIf="reportContent" [innerHTML]="reportContent"></div>
    </div>
  `,
  styles: [`
    .report-viewer { min-height: 400px; border: 1px dashed #ccc; display: flex; justify-content: center; align-items: center; margin-top: 20px; }
    .placeholder { text-align: center; color: #999; }
    .placeholder mat-icon { font-size: 48px; width: 48px; height: 48px; }
  `]
})
export class ReportViewerComponent {
  @Input() reportContent: SafeHtml | null = null;
}
