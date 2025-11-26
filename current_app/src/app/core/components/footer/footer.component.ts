import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="app-footer">
      <span>&copy; 2023 Enterprise Corp. All rights reserved. v1.0.0</span>
    </footer>
  `,
  styles: [`
    .app-footer { height: 50px; display: flex; align-items: center; justify-content: center; background: #fff; border-top: 1px solid #eee; color: #666; font-size: 12px; }
  `]
})
export class FooterComponent { }
