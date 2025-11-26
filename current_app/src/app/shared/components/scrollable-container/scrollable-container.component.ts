import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-scrollable-container',
  templateUrl: './scrollable-container.component.html',
  styleUrls: ['./scrollable-container.component.scss']
})
export class ScrollableContainerComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;
  @Input() height: string = '100%';
  @Input() maxHeight?: string;
  @Input() config?: PerfectScrollbarConfigInterface;

  scrollbarConfig: PerfectScrollbarConfigInterface = {
    suppressScrollX: false,
    suppressScrollY: false,
    wheelSpeed: 1,
    wheelPropagation: false,
    swipeEasing: true,
    minScrollbarLength: null,
    maxScrollbarLength: null,
    scrollingThreshold: 1000,
    useBothWheelAxes: false,
    handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
    ...this.config
  };

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}

