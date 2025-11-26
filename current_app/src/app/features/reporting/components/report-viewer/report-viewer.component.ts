import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss']
})
export class ReportViewerComponent implements OnInit {
  @Input() reportContent: SafeHtml | null = null;
  @Input() reportTitle?: string;
  @Input() reportFormat?: 'html' | 'pdf' | 'excel' | 'csv';
  @Input() generatedDate?: Date;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (!this.generatedDate) {
      this.generatedDate = new Date();
    }
  }

  download(): void {
    console.log('Downloading report...');
    // In real app: this.reportService.downloadReport(this.reportContent);
  }

  print(): void {
    window.print();
  }

  share(): void {
    console.log('Sharing report...');
    // In real app: implement share functionality
  }
}
