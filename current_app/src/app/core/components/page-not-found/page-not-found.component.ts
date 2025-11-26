import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <button mat-raised-button color="primary" routerLink="/">Go Home</button>
    </div>
  `,
  styles: [`
    .not-found { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    h1 { font-size: 72px; margin: 0; color: #ccc; }
  `]
})
export class PageNotFoundComponent { }
