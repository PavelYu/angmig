import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { RegionalMapComponent } from './components/regional-map/regional-map.component';
import { NetworkGraphComponent } from './components/network-graph/network-graph.component';
import { ActivityFeedComponent } from './components/activity-feed/activity-feed.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxGraphModule } from '@swimlane/ngx-graph';

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
    CommonModule,
    RouterModule,
    SharedModule,
    NgxGraphModule
  ]
})
export class DashboardModule { }
