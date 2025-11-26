import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { MarkdownViewerComponent } from '../markdown-viewer/markdown-viewer.component';

export type ReportFormat = 'html' | 'markdown' | 'pdf' | 'text';

@Component({
  selector: 'app-report-content-viewer',
  templateUrl: './report-content-viewer.component.html',
  styleUrls: ['./report-content-viewer.component.scss']
})
export class ReportContentViewerComponent implements OnInit, OnChanges {
  @Input() content: string = '';
  @Input() format: ReportFormat = 'html';
  @Input() title?: string;
  @Input() pdfUrl?: string;

  safeContent: SafeHtml | SafeResourceUrl | null = null;
  isPdf = false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.processContent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content'] || changes['format'] || changes['pdfUrl']) {
      this.processContent();
    }
  }

  private processContent(): void {
    if (this.format === 'pdf' && this.pdfUrl) {
      this.isPdf = true;
      this.safeContent = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
    } else if (this.format === 'pdf' && !this.pdfUrl) {
      // Generate PDF viewer URL from content if it's base64
      this.isPdf = true;
      this.safeContent = this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:application/pdf;base64,${this.content}`
      );
    } else if (this.format === 'markdown') {
      this.isPdf = false;
      // Markdown will be handled by MarkdownViewerComponent
      this.safeContent = null;
    } else if (this.format === 'html') {
      this.isPdf = false;
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.content);
    } else {
      // Plain text
      this.isPdf = false;
      const escapedText = this.escapeHtml(this.content);
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(`<pre>${escapedText}</pre>`);
    }
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  downloadPdf(): void {
    if (this.pdfUrl) {
      window.open(this.pdfUrl, '_blank');
    }
  }

  printReport(): void {
    window.print();
  }
}

