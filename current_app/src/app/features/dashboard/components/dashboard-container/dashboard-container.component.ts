import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface DashboardWidget {
  id: string;
  type: 'kpi' | 'chart' | 'map' | 'graph' | 'feed';
  title: string;
  cols: number;
  rows: number;
  data?: any;
}

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {
  kpiData = [
    { 
      title: 'Total Revenue', 
      value: '$1,234,567', 
      trend: 'up' as const, 
      changePercent: 12.5,
      icon: 'attach_money',
      chartData: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4] 
    },
    { 
      title: 'Active Users', 
      value: '45,678', 
      trend: 'up' as const, 
      changePercent: 8.3,
      icon: 'people',
      chartData: [50, 60, 55, 70, 65, 80, 90, 85, 95, 88, 92, 100] 
    },
    { 
      title: 'Bounce Rate', 
      value: '12.5%', 
      trend: 'down' as const, 
      changePercent: -5.2,
      icon: 'trending_down',
      chartData: [40, 35, 30, 25, 20, 15, 12, 14, 13, 12, 11, 10] 
    },
    { 
      title: 'Avg. Session', 
      value: '4m 32s', 
      trend: 'stable' as const, 
      changePercent: 0.5,
      icon: 'schedule',
      chartData: [4, 4, 5, 4, 5, 4, 4, 5, 4, 5, 4, 4] 
    }
  ];

  widgets: DashboardWidget[] = [
    { id: '1', type: 'kpi', title: 'Revenue', cols: 1, rows: 1 },
    { id: '2', type: 'kpi', title: 'Users', cols: 1, rows: 1 },
    { id: '3', type: 'kpi', title: 'Bounce', cols: 1, rows: 1 },
    { id: '4', type: 'kpi', title: 'Session', cols: 1, rows: 1 },
    { id: '5', type: 'chart', title: 'Revenue Chart', cols: 2, rows: 2 },
    { id: '6', type: 'map', title: 'Regional Map', cols: 2, rows: 2 },
    { id: '7', type: 'feed', title: 'Activity Feed', cols: 1, rows: 3 }
  ];

  constructor() { }

  ngOnInit(): void {
    // Load saved dashboard layout from localStorage
    const savedLayout = localStorage.getItem('dashboardLayout');
    if (savedLayout) {
      try {
        this.widgets = JSON.parse(savedLayout);
      } catch (e) {
        console.error('Failed to load saved layout', e);
      }
    }
  }

  drop(event: CdkDragDrop<DashboardWidget[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.saveLayout();
  }

  saveLayout(): void {
    localStorage.setItem('dashboardLayout', JSON.stringify(this.widgets));
  }

  getWidgetById(id: string): DashboardWidget | undefined {
    return this.widgets.find(w => w.id === id);
  }

  getKpiData(index: number): any {
    return this.kpiData[index] || this.kpiData[0];
  }
}
