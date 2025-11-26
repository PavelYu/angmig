import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent implements OnInit, OnChanges {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() trend: 'up' | 'down' | 'stable' = 'stable';
  @Input() chartData: number[] = [];
  @Input() changePercent?: number;
  @Input() icon?: string;
  @Input() color?: string;

  @ViewChild('sparklineContainer', { static: true }) sparklineContainer!: ElementRef;

  Highcharts: typeof Highcharts = Highcharts;
  sparklineOptions: Highcharts.Options = {};

  ngOnInit(): void {
    this.updateSparkline();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && !changes['chartData'].firstChange) {
      this.updateSparkline();
    }
  }

  updateSparkline(): void {
    if (!this.chartData || this.chartData.length === 0) {
      return;
    }

    this.sparklineOptions = {
      chart: {
        type: 'area',
        backgroundColor: 'transparent',
        height: 60,
        margin: [0, 0, 0, 0],
        spacing: [0, 0, 0, 0]
      },
      title: { text: undefined },
      credits: { enabled: false },
      legend: { enabled: false },
      xAxis: {
        labels: { enabled: false },
        lineWidth: 0,
        tickLength: 0
      },
      yAxis: {
        labels: { enabled: false },
        title: { text: undefined },
        gridLineWidth: 0
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, this.getTrendColor(0.3)],
              [1, this.getTrendColor(0.05)]
            ]
          },
          lineWidth: 2,
          marker: { enabled: false },
          states: { hover: { lineWidth: 2 } },
          threshold: null
        }
      },
      series: [{
        type: 'area',
        name: this.title,
        data: this.chartData,
        color: this.getTrendColor(1)
      }],
      tooltip: {
        enabled: false
      }
    };
  }

  getTrendIcon(): string {
    switch (this.trend) {
      case 'up': return 'trending_up';
      case 'down': return 'trending_down';
      default: return 'trending_flat';
    }
  }

  getTrendColor(alpha: number = 1): string {
    if (this.color) {
      return this.color;
    }
    switch (this.trend) {
      case 'up': return `rgba(76, 175, 80, ${alpha})`;
      case 'down': return `rgba(244, 67, 54, ${alpha})`;
      default: return `rgba(158, 158, 158, ${alpha})`;
    }
  }

  getChangeDisplay(): string {
    if (this.changePercent === undefined) return '';
    const sign = this.changePercent >= 0 ? '+' : '';
    return `${sign}${this.changePercent.toFixed(1)}%`;
  }
}
