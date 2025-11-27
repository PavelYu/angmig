import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface TabItem {
  label: string;
  icon?: string;
  content?: string;
  disabled?: boolean;
  badge?: string | number;
  route?: string; // For routing-based tabs
}

@Component({
    selector: 'app-tabs-container',
    templateUrl: './tabs-container.component.html',
    styleUrls: ['./tabs-container.component.scss'],
    standalone: false
})
export class TabsContainerComponent {
  @Input() tabs: TabItem[] = [];
  @Input() selectedIndex = 0;
  @Input() backgroundColor: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() alignTabs: 'start' | 'center' | 'end' = 'start';
  @Output() selectedIndexChange = new EventEmitter<number>();
  @Output() tabChange = new EventEmitter<{ index: number; tab: TabItem }>();

  onTabChange(index: number): void {
    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
    this.tabChange.emit({ index, tab: this.tabs[index] });
  }
}

