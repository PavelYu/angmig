import { Component, Input } from '@angular/core';

export interface ExpansionPanelItem {
  title: string;
  description?: string;
  content: string;
  icon?: string;
  disabled?: boolean;
  expanded?: boolean;
}

@Component({
    selector: 'app-expansion-panel-group',
    templateUrl: './expansion-panel-group.component.html',
    styleUrls: ['./expansion-panel-group.component.scss'],
    standalone: false
})
export class ExpansionPanelGroupComponent {
  @Input() panels: ExpansionPanelItem[] = [];
  @Input() multi = false; // Allow multiple panels open at once
  @Input() displayMode: 'default' | 'flat' = 'default';

  panelOpened(panel: ExpansionPanelItem): void {
    if (!this.multi) {
      // Close other panels
      this.panels.forEach(p => {
        if (p !== panel) {
          p.expanded = false;
        }
      });
    }
  }

  panelClosed(panel: ExpansionPanelItem): void {
    // Panel closed callback if needed
  }
}

