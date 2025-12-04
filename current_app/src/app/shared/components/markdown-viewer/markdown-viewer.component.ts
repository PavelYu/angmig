import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.scss']
})
export class MarkdownViewerComponent implements OnInit, OnChanges {
  @Input() content: string = '';
  @Input() sanitize = true;
  @Input() highlightCode = false;

  renderedHtml: SafeHtml = '';
  private markedOptions = {
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
  };

  constructor(private sanitizer: DomSanitizer) {
    marked.setOptions(this.markedOptions);
  }

  ngOnInit(): void {
    this.renderMarkdown();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      this.renderMarkdown();
    }
  }

  private renderMarkdown(): void {
    if (!this.content) {
      this.renderedHtml = '';
      return;
    }

    try {
      const html = marked.parse(this.content) as string;
      this.renderedHtml = this.sanitize
        ? this.sanitizer.sanitize(1, html) as SafeHtml
        : this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (error) {
      console.error('Markdown parsing error:', error);
      this.renderedHtml = '<p>Error rendering markdown content</p>';
    }
  }
}

