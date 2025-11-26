import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

export interface VirtualScrollItem {
  id: string | number;
  [key: string]: any;
}

@Component({
  selector: 'app-virtual-scroll-list',
  templateUrl: './virtual-scroll-list.component.html',
  styleUrls: ['./virtual-scroll-list.component.scss']
})
export class VirtualScrollListComponent implements OnInit {
  @Input() items: VirtualScrollItem[] = [];
  @Input() itemHeight = 50;
  @Input() bufferSize = 3;
  @Input() templateRef?: any; // Custom template for items
  @Output() itemClick = new EventEmitter<VirtualScrollItem>();
  @Output() scrolledIndexChange = new EventEmitter<number>();

  displayedItems: VirtualScrollItem[] = [];

  ngOnInit(): void {
    this.displayedItems = this.items;
  }

  onItemClick(item: VirtualScrollItem): void {
    this.itemClick.emit(item);
  }

  trackByFn(index: number, item: VirtualScrollItem): string | number {
    return item.id;
  }
}

