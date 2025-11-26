import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { RegionalMapComponent } from './components/regional-map/regional-map.component';
import { NetworkGraphComponent } from './components/network-graph/network-graph.component';
import { ActivityFeedComponent } from './components/activity-feed/activity-feed.component';



@NgModule({
  declarations: [
    DashboardContainerComponent,
    KpiCardComponent,
    RevenueChartComponent,
    RegionalMapComponent,
    NetworkGraphComponent,
    ActivityFeedComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
