import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-revenue-chart',
  template: `
    <highcharts-chart 
      [Highcharts]="Highcharts"
      [options]="chartOptions"
      style="width: 100%; height: 300px; display: block;">
    </highcharts-chart>
  `
})
export class RevenueChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: { text: undefined },
    series: [{
      type: 'line',
      data: [1, 2, 3, 4, 5],
      name: 'Revenue'
    }],
    credits: { enabled: false }
  };

  constructor() { }

  ngOnInit(): void {
    // Simulate data update
    setTimeout(() => {
      this.chartOptions = {
        ...this.chartOptions,
        series: [{
          type: 'line',
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
          name: 'Revenue 2023'
        }]
      };
    }, 1000);
  }
}
