import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Initialize map module
MapModule(Highcharts);

@Component({
  selector: 'app-regional-map',
  templateUrl: './regional-map.component.html',
  styleUrls: ['./regional-map.component.scss']
})
export class RegionalMapComponent implements OnInit, OnDestroy {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  updateFlag = false;
  private destroy$ = new Subject<void>();

  // Mock regional data
  private regionalData: { [key: string]: number } = {
    'US': 45000,
    'CA': 32000,
    'GB': 28000,
    'DE': 25000,
    'FR': 22000,
    'AU': 18000,
    'JP': 15000,
    'BR': 12000,
    'IN': 10000,
    'CN': 8000
  };

  constructor() {}

  ngOnInit(): void {
    this.initializeMap();
    
    // Simulate data updates
    interval(10000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.updateMapData();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeMap(): void {
    // Simplified map implementation - in production, load actual GeoJSON
    this.chartOptions = {
      chart: {
        map: 'custom/world',
        backgroundColor: 'transparent',
        height: 400
      },
      title: {
        text: 'Geographic Distribution',
        style: {
          fontSize: '18px',
          fontWeight: '500'
        }
      },
      subtitle: {
        text: 'Revenue by region (in thousands)'
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },
      colorAxis: {
        min: 0,
        stops: [
          [0, '#E3F2FD'],
          [0.5, '#64B5F6'],
          [1, '#1976D2']
        ]
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      series: [{
        name: 'Revenue',
        data: Object.entries(this.regionalData).map(([code, value]) => ({
          'hc-key': code.toLowerCase(),
          value: value
        })),
        joinBy: 'hc-key',
        states: {
          hover: {
            color: '#FFC107'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        },
        tooltip: {
          pointFormat: '{point.name}: <b>${point.value}k</b>'
        }
      }],
      credits: {
        enabled: false
      }
    };
  }

  private updateMapData(): void {
    // Simulate data updates
    const regions = Object.keys(this.regionalData);
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    this.regionalData[randomRegion] = Math.max(5000, this.regionalData[randomRegion] + (Math.random() * 5000 - 2500));
    
    if (this.chartOptions.series && this.chartOptions.series[0]) {
      const series = this.chartOptions.series[0] as any;
      series.data = Object.entries(this.regionalData).map(([code, value]) => ({
        'hc-key': code.toLowerCase(),
        value: value
      }));
      this.updateFlag = true;
    }
  }
}
