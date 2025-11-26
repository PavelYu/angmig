import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {
  kpiData = [
    { title: 'Total Revenue', value: '$1,234,567', trend: 'up', chartData: [10, 15, 13, 20, 25, 22, 30] },
    { title: 'Active Users', value: '45,678', trend: 'up', chartData: [50, 60, 55, 70, 65, 80, 90] },
    { title: 'Bounce Rate', value: '12.5%', trend: 'down', chartData: [40, 35, 30, 25, 20, 15, 12] },
    { title: 'Avg. Session', value: '4m 32s', trend: 'stable', chartData: [4, 4, 5, 4, 5, 4, 4] }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
