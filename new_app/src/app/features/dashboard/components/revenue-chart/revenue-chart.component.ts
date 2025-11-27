import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-revenue-chart',
    templateUrl: './revenue-chart.component.html',
    styleUrls: ['./revenue-chart.component.scss'],
    standalone: false
})
export class RevenueChartComponent implements OnInit, OnDestroy {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  // updateFlag removed - not supported in highcharts-angular v3.1.2
  private destroy$ = new Subject<void>();

  private months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  private revenueData2023 = [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4];
  private revenueData2024 = [45.2, 82.1, 125.3, 158.7, 189.2, 201.5, 178.3, 195.6, 234.8, 210.3, 145.2, 98.7];

  constructor() {}

  ngOnInit(): void {
    this.initializeChart();
    
    // Simulate real-time data updates
    interval(5000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.updateChartData();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
        // Chart will update automatically when chartOptions changes
  }

  private initializeChart(): void {
    this.chartOptions = {
      chart: {
        type: 'line',
        backgroundColor: 'transparent',
        height: 400
      },
      title: {
        text: 'Revenue Overview',
        style: {
          fontSize: '18px',
          fontWeight: '500'
        }
      },
      subtitle: {
        text: 'Monthly revenue comparison (in thousands)'
      },
      xAxis: {
        categories: this.months,
        crosshair: true
      },
      yAxis: {
        title: {
          text: 'Revenue ($)'
        },
        labels: {
          format: '${value}k'
        }
      },
      tooltip: {
        shared: true,
        valuePrefix: '$',
        valueSuffix: 'k',
        useHTML: true
      },
      plotOptions: {
        line: {
          marker: {
            enabled: true,
            radius: 4
          },
          lineWidth: 3
        },
        area: {
          fillOpacity: 0.3
        }
      },
      legend: {
        enabled: true,
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical'
      },
      series: [
        {
          name: '2023',
          type: 'line',
          data: this.revenueData2023,
          color: '#2196F3',
          marker: {
            fillColor: '#2196F3'
          }
        },
        {
          name: '2024',
          type: 'line',
          data: this.revenueData2024,
          color: '#4CAF50',
          marker: {
            fillColor: '#4CAF50'
          }
        },
        {
          name: 'Target',
          type: 'line',
          data: [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
          color: '#FF9800',
          dashStyle: 'Dash',
          marker: {
            enabled: false
          }
        }
      ],
      credits: {
        enabled: false
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              enabled: false
            }
          }
        }]
      }
    };
  }

  private updateChartData(): void {
    // Simulate data updates
    const randomIndex = Math.floor(Math.random() * this.revenueData2024.length);
    this.revenueData2024[randomIndex] = Math.max(50, this.revenueData2024[randomIndex] + (Math.random() * 20 - 10));
    
    if (this.chartOptions.series && this.chartOptions.series[1]) {
      // Update series data - create new options object to trigger change detection
      this.chartOptions = {
        ...this.chartOptions,
        series: this.chartOptions.series.map((s, idx) => 
          idx === 1 ? { ...s, data: [...this.revenueData2024] } : s
        ) as Highcharts.SeriesOptionsType[]
      };
    }
  }
}
