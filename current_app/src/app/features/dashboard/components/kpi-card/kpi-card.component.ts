import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  template: `
    <mat-card class="kpi-card">
      <mat-card-content>
        <div class="kpi-header">
          <span class="kpi-title">{{ title }}</span>
          <mat-icon [ngClass]="trend">{{ getTrendIcon() }}</mat-icon>
        </div>
        <div class="kpi-value">{{ value }}</div>
        <!-- Sparkline placeholder -->
        <div class="sparkline">[Sparkline Chart]</div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .kpi-card { height: 100%; }
    .kpi-header { display: flex; justify-content: space-between; align-items: center; color: #666; }
    .kpi-value { font-size: 24px; font-weight: bold; margin: 10px 0; }
    .up { color: green; }
    .down { color: red; }
    .stable { color: grey; }
  `]
})
export class KpiCardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() trend: string = 'stable';
  @Input() chartData: number[] = [];

  getTrendIcon(): string {
    switch (this.trend) {
      case 'up': return 'trending_up';
      case 'down': return 'trending_down';
      default: return 'trending_flat';
    }
  }
}
