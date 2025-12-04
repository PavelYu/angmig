import { Directive, Input, OnInit, OnDestroy, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';

@Directive({
  selector: '[appInViewport]'
})
export class InViewportDirective implements OnInit, OnDestroy {
  @Input() appInViewport: boolean = true; // Enable/disable directive
  @Input() appInViewportOffset = 0; // Offset in pixels
  @Input() appInViewportOnce = false; // Load only once

  private hasLoaded = false;
  private observer: IntersectionObserver | null = null;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    if (!this.appInViewport) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }

    // Create view initially hidden
    const view = this.viewContainer.createEmbeddedView(this.templateRef);
    const element = view.rootNodes[0] as HTMLElement;

    if (element && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!this.hasLoaded || !this.appInViewportOnce) {
                this.loadContent();
                this.hasLoaded = true;

                if (this.appInViewportOnce && this.observer) {
                  this.observer.disconnect();
                }
              }
            }
          });
        },
        {
          rootMargin: `${this.appInViewportOffset}px`
        }
      );

      this.observer.observe(element);
    } else {
      // Fallback for browsers without IntersectionObserver
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private loadContent(): void {
    // Content is already rendered, just make it visible
    // In a real implementation, you might load data here
  }
}

