import { Component } from '@angular/core';
import { Edge, Node } from '@swimlane/ngx-graph';

@Component({
    selector: 'app-network-graph',
    templateUrl: './network-graph.component.html',
    styleUrls: ['./network-graph.component.scss'],
    standalone: false
})
export class NetworkGraphComponent {
  view: [number, number] = [800, 400];
  autoZoom = true;
  showLegend = true;
  selectedNode: string | null = null;

  nodes: Node[] = [
    { id: 'user', label: 'User', data: { color: '#1976d2' } },
    { id: 'order', label: 'Order', data: { color: '#388e3c' } },
    { id: 'product', label: 'Product', data: { color: '#f57c00' } },
    { id: 'payment', label: 'Payment', data: { color: '#7b1fa2' } },
    { id: 'shipping', label: 'Shipping', data: { color: '#c2185b' } }
  ];

  links: Edge[] = [
    { id: '1', source: 'user', target: 'order', label: 'creates', data: { color: '#1976d2' } },
    { id: '2', source: 'order', target: 'product', label: 'contains', data: { color: '#388e3c' } },
    { id: '3', source: 'order', target: 'payment', label: 'requires', data: { color: '#7b1fa2' } },
    { id: '4', source: 'order', target: 'shipping', label: 'ships via', data: { color: '#c2185b' } }
  ];

  curve: any = undefined; // Default curve

  zoomIn(): void {
    // Implement zoom in logic
    console.log('Zoom in');
  }

  zoomOut(): void {
    // Implement zoom out logic
    console.log('Zoom out');
  }

  resetZoom(): void {
    // Implement reset zoom logic
    console.log('Reset zoom');
  }

  toggleLayout(): void {
    // Implement layout toggle logic
    console.log('Toggle layout');
  }

  onNodeClick(node: Node): void {
    this.selectedNode = node.id;
    console.log('Node clicked:', node);
  }

  onLinkClick(link: Edge): void {
    console.log('Link clicked:', link);
  }
}
