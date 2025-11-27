import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
// Note: d3-scale and d3-shape are modular - for full D3 functionality, consider using d3-selection
// This is a simplified implementation using the available modules
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';

export interface D3ChartDataPoint {
  x: number | string | Date;
  y: number;
  label?: string;
}

export type D3ChartType = 'line' | 'bar' | 'area' | 'scatter';

@Component({
    selector: 'app-d3-chart',
    templateUrl: './d3-chart.component.html',
    styleUrls: ['./d3-chart.component.scss'],
    standalone: false
})
export class D3ChartComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  @Input() data: D3ChartDataPoint[] = [];
  @Input() type: D3ChartType = 'line';
  @Input() width = 800;
  @Input() height = 400;
  @Input() margin = { top: 20, right: 20, bottom: 40, left: 50 };
  @Input() xLabel = '';
  @Input() yLabel = '';
  @Input() color = '#1976d2';
  @Input() showGrid = true;
  @Input() showTooltip = true;

  private svgElement: SVGElement | null = null;
  private xScale: any;
  private yScale: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => this.createChart(), 0);
  }

  ngOnDestroy(): void {
    if (this.svgElement && this.svgElement.parentNode) {
      this.svgElement.parentNode.removeChild(this.svgElement);
    }
  }

  private createChart(): void {
    if (!this.chartContainer || !this.data || this.data.length === 0) {
      return;
    }

    const container = this.chartContainer.nativeElement;
    container.innerHTML = '';

    const chartWidth = this.width - this.margin.left - this.margin.right;
    const chartHeight = this.height - this.margin.top - this.margin.bottom;

    // Create SVG element using native DOM API
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', String(this.width));
    svg.setAttribute('height', String(this.height));
    svg.setAttribute('class', 'd3-chart-svg');

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${this.margin.left},${this.margin.top})`);

    // Create scales using d3-scale
    const xValues = this.data.map(d => typeof d.x === 'number' ? d.x : 0);
    const yValues = this.data.map(d => d.y);

    if (this.type === 'bar') {
      this.xScale = d3Scale.scaleBand()
        .domain(this.data.map((d, i) => String(i)))
        .range([0, chartWidth])
        .padding(0.1);
    } else {
      this.xScale = d3Scale.scaleLinear()
        .domain([Math.min(...xValues), Math.max(...xValues)])
        .range([0, chartWidth]);
    }

    this.yScale = d3Scale.scaleLinear()
      .domain([0, Math.max(...yValues)])
      .nice()
      .range([chartHeight, 0]);

    // Create path data using d3-shape
    if (this.type === 'line' || this.type === 'area') {
      const lineGenerator = d3Shape.line()
        .x((d: any, i: number) => this.type === 'bar' ? this.xScale(String(i))! : this.xScale(d.x)!)
        .y((d: any) => this.yScale(d.y)!);

      if (this.type === 'area') {
        const areaGenerator = d3Shape.area()
          .x((d: any, i: number) => this.xScale(d.x)!)
          .y0(chartHeight)
          .y1((d: any) => this.yScale(d.y)!);

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', areaGenerator(this.data as any) || '');
        path.setAttribute('fill', this.color);
        path.setAttribute('opacity', '0.6');
        g.appendChild(path);
      } else {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', lineGenerator(this.data as any) || '');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', this.color);
        path.setAttribute('stroke-width', '2');
        g.appendChild(path);
      }
    } else if (this.type === 'bar') {
      this.data.forEach((d, i) => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        const x = this.xScale(String(i)) || 0;
        const width = this.xScale.bandwidth();
        const y = this.yScale(d.y) || 0;
        const height = chartHeight - y;
        
        rect.setAttribute('x', String(x));
        rect.setAttribute('y', String(y));
        rect.setAttribute('width', String(width));
        rect.setAttribute('height', String(height));
        rect.setAttribute('fill', this.color);
        rect.setAttribute('class', 'bar');
        g.appendChild(rect);
      });
    } else if (this.type === 'scatter') {
      this.data.forEach((d) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', String(this.xScale(d.x)));
        circle.setAttribute('cy', String(this.yScale(d.y)));
        circle.setAttribute('r', '5');
        circle.setAttribute('fill', this.color);
        circle.setAttribute('opacity', '0.7');
        circle.setAttribute('class', 'dot');
        g.appendChild(circle);
      });
    }

    // Add axes (simplified - using basic SVG elements)
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', '0');
    xAxis.setAttribute('y1', String(chartHeight));
    xAxis.setAttribute('x2', String(chartWidth));
    xAxis.setAttribute('y2', String(chartHeight));
    xAxis.setAttribute('stroke', '#666');
    xAxis.setAttribute('stroke-width', '1');
    g.appendChild(xAxis);

    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', '0');
    yAxis.setAttribute('y1', '0');
    yAxis.setAttribute('x2', '0');
    yAxis.setAttribute('y2', String(chartHeight));
    yAxis.setAttribute('stroke', '#666');
    yAxis.setAttribute('stroke-width', '1');
    g.appendChild(yAxis);

    // Add labels
    if (this.xLabel) {
      const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      xLabel.setAttribute('x', String(chartWidth / 2));
      xLabel.setAttribute('y', String(chartHeight + 35));
      xLabel.setAttribute('text-anchor', 'middle');
      xLabel.setAttribute('fill', '#666');
      xLabel.textContent = this.xLabel;
      g.appendChild(xLabel);
    }

    if (this.yLabel) {
      const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      yLabel.setAttribute('transform', 'rotate(-90)');
      yLabel.setAttribute('x', String(-chartHeight / 2));
      yLabel.setAttribute('y', String(-this.margin.left + 15));
      yLabel.setAttribute('text-anchor', 'middle');
      yLabel.setAttribute('fill', '#666');
      yLabel.textContent = this.yLabel;
      g.appendChild(yLabel);
    }

    svg.appendChild(g);
    container.appendChild(svg);
    this.svgElement = svg;
  }

  updateData(newData: D3ChartDataPoint[]): void {
    this.data = newData;
    this.createChart();
  }
}

