import { Component } from '@angular/core';
import { Edge, Node } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-network-graph',
  template: `
    <ngx-graph
      class="chart-container"
      [view]="[800, 400]"
      [links]="links"
      [nodes]="nodes"
      [curve]="curve"
      [autoZoom]="true">
      
      <ng-template #nodeTemplate let-node>
        <svg:g class="node">
          <svg:rect [attr.width]="node.dimension.width" [attr.height]="node.dimension.height" [attr.fill]="node.data.color" />
          <svg:text alignment-baseline="central" [attr.x]="10" [attr.y]="node.dimension.height / 2">{{node.label}}</svg:text>
        </svg:g>
      </ng-template>

      <ng-template #linkTemplate let-link>
        <svg:g class="edge">
          <svg:path class="line" stroke-width="2" marker-end="url(#arrow)"></svg:path>
        </svg:g>
      </ng-template>
    </ngx-graph>
  `,
  styles: [`
    .chart-container { height: 400px; width: 100%; }
  `]
})
export class NetworkGraphComponent {
  nodes: Node[] = [
    { id: 'start', label: 'Start', data: { color: '#5AA454' } },
    { id: 'mid', label: 'Process', data: { color: '#A10A28' } },
    { id: 'end', label: 'End', data: { color: '#C7B42C' } }
  ];

  links: Edge[] = [
    { id: 'a', source: 'start', target: 'mid', label: 'Next' },
    { id: 'b', source: 'mid', target: 'end', label: 'Finish' }
  ];

  curve: any = undefined; // Default curve
}
