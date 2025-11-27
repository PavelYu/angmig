import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    standalone: false
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
  @Input() color?: string;
  @Input() fontSize?: number;
  @Input() useSvg = false; // Use SVG sprite vs Material icon

  get sizePx(): number {
    const sizes = {
      small: 16,
      medium: 24,
      large: 32,
      xlarge: 48
    };
    return sizes[this.size] || 24;
  }
}
