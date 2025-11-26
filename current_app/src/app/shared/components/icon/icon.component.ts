import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `
    <svg class="icon" [class]="size">
      <use [attr.href]="'assets/icons.svg#' + name"></use>
    </svg>
  `,
  styles: [`
    .icon { fill: currentColor; }
    .small { width: 16px; height: 16px; }
    .medium { width: 24px; height: 24px; }
    .large { width: 32px; height: 32px; }
  `]
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
