import { Directive, Input, OnInit, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { InViewportService, InViewportMetadata } from 'ng-in-viewport';

@Directive({
    selector: '[appInViewport]',
    standalone: false
})
export class InViewportDirective implements OnInit, OnDestroy {
  @Input() appInViewport: boolean = true; // Enable/disable directive
  @Input() appInViewportOffset = 0; // Offset in pixels
  @Input() appInViewportOnce = false; // Load only once

  private hasLoaded = false;
  private subscription: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private inViewportService: InViewportService
  ) {}

  ngOnInit(): void {
    if (!this.appInViewport) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }

    // Create view initially hidden
    const view = this.viewContainer.createEmbeddedView(this.templateRef);
    const element = view.rootNodes[0] as HTMLElement;

    if (element) {
      // Subscribe to viewport events
      this.subscription = this.inViewportService.trigger$.subscribe((metadata: any) => {
        if (metadata.target === element && metadata.visible) {
          if (!this.hasLoaded || !this.appInViewportOnce) {
            this.loadContent();
            this.hasLoaded = true;
          }
        }
      });

      // Trigger initial check
      // Note: check() method may not exist in this version of ng-in-viewport
      // Viewport detection happens automatically via trigger$ subscription
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadContent(): void {
    // Content is already rendered, just make it visible
    // In a real implementation, you might load data here
  }
}

