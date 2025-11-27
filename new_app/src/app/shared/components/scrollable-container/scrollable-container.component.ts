import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

/**
 * ScrollableContainerComponent - Native CSS scrollbar implementation
 * 
 * Replaced ngx-perfect-scrollbar (deprecated, View Engine only) with native CSS scrollbar.
 * Pattern: Deprecated package replacement - use native browser features when possible.
 */
@Component({
    selector: 'app-scrollable-container',
    templateUrl: './scrollable-container.component.html',
    styleUrls: ['./scrollable-container.component.scss'],
    standalone: false
})
export class ScrollableContainerComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;
  @Input() height: string = '100%';
  @Input() maxHeight?: string;
  @Input() scrollbarWidth: 'thin' | 'auto' | 'none' = 'thin';
  @Input() scrollbarColor: string = '#888';
  @Input() scrollbarTrackColor: string = '#f1f1f1';

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}

