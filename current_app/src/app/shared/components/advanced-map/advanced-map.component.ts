import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as proj4 from 'proj4';
import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';

export interface MapDataPoint {
  code: string;
  value: number;
  name?: string;
}

@Component({
  selector: 'app-advanced-map',
  templateUrl: './advanced-map.component.html',
  styleUrls: ['./advanced-map.component.scss']
})
export class AdvancedMapComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  @Input() data: MapDataPoint[] = [];
  @Input() mapType: 'world' | 'us' | 'europe' | 'custom' = 'world';
  @Input() projection: 'mercator' | 'lambert' | 'albers' | 'custom' = 'mercator';
  @Input() customProjection?: string; // Proj4 projection string
  @Input() colorAxisMin = 0;
  @Input() colorAxisMax?: number;
  @Input() title = 'Geographic Data Visualization';
  @Input() height = 500;

  private chart: any;

  ngOnInit(): void {
    MapModule(Highcharts);
    this.createMap();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createMap(): void {
    if (!this.mapContainer) {
      return;
    }

    const mapData = this.prepareMapData();
    const projectionConfig = this.getProjectionConfig();

    const options: Highcharts.Options = {
      chart: {
        map: mapData,
        renderTo: this.mapContainer.nativeElement,
        height: this.height
      },
      title: {
        text: this.title
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },
      colorAxis: {
        min: this.colorAxisMin,
        max: this.colorAxisMax || Math.max(...this.data.map(d => d.value)),
        stops: [
          [0, '#ffffff'],
          [0.5, '#64b5f6'],
          [1, '#1976d2']
        ]
      },
      series: [{
        type: 'map',
        name: 'Data',
        data: this.data.map(d => [d.code, d.value]),
        joinBy: 'hc-key',
        states: {
          hover: {
            color: '#ff9800'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        },
        tooltip: {
          pointFormat: '{point.name}: <b>{point.value}</b>'
        }
      }],
      ...projectionConfig
    };

    // Note: Highcharts.mapChart requires map topology data
    // In production, load actual map topology from @highcharts/map-collection
    // For now, create a placeholder chart
    try {
      this.chart = (Highcharts as any).mapChart(this.mapContainer.nativeElement, options);
    } catch (error) {
      console.warn('Map chart creation failed. Ensure map topology data is loaded.', error);
      // Fallback: create a simple chart container
      const placeholder = document.createElement('div');
      placeholder.className = 'map-placeholder';
      placeholder.innerHTML = '<p>Map visualization requires topology data. Load map data from @highcharts/map-collection.</p>';
      this.mapContainer.nativeElement.appendChild(placeholder);
    }
  }

  private prepareMapData(): any {
    // In real app, load map topology from Highcharts map collection
    // For now, return mock structure
    return {
      type: 'Topology',
      objects: {}
    };
  }

  private getProjectionConfig(): any {
    if (this.customProjection) {
      // Use custom proj4 projection
      return {
        proj4def: this.customProjection
      };
    }

    const projectionMap: { [key: string]: string } = {
      mercator: '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',
      lambert: '+proj=lcc +lat_1=33 +lat_2=45 +lat_0=39 +lon_0=-96 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',
      albers: '+proj=aea +lat_1=29.5 +lat_2=45.5 +lat_0=37.5 +lon_0=-96 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs'
    };

    return {
      proj4def: projectionMap[this.projection] || projectionMap.mercator
    };
  }

  updateData(newData: MapDataPoint[]): void {
    this.data = newData;
    if (this.chart) {
      this.chart.series[0].setData(newData.map(d => [d.code, d.value]));
    }
  }

  changeProjection(projection: string): void {
    this.projection = projection as any;
    this.createMap();
  }
}

