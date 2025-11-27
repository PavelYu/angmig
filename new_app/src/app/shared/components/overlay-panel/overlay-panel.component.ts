import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-overlay-panel',
    templateUrl: './overlay-panel.component.html',
    styleUrls: ['./overlay-panel.component.scss'],
    standalone: false
})
export class OverlayPanelComponent implements OnInit, OnDestroy {
  @Input() trigger: 'click' | 'hover' = 'click';
  @Input() position: 'above' | 'below' | 'before' | 'after' | 'center' = 'below';
  @Input() hasBackdrop = true;
  @Input() backdropClass = 'cdk-overlay-dark-backdrop';
  @Input() panelClass = 'overlay-panel';
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  @ViewChild('triggerTemplate') triggerTemplate!: TemplateRef<any>;
  @ViewChild('panelTemplate') panelTemplate!: TemplateRef<any>;

  private overlayRef: OverlayRef | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.close();
    this.destroy$.next();
    this.destroy$.complete();
  }

  open(): void {
    if (this.overlayRef) {
      return;
    }

    const config = this.getOverlayConfig();
    this.overlayRef = this.overlay.create(config);

    const portal = new TemplatePortal(this.panelTemplate, this.viewContainerRef);
    this.overlayRef.attach(portal);

    if (this.hasBackdrop) {
      this.overlayRef.backdropClick()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.close());
    }

    this.opened.emit();
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.closed.emit();
    }
  }

  toggle(): void {
    if (this.overlayRef) {
      this.close();
    } else {
      this.open();
    }
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.getPositionStrategy();
    
    return {
      hasBackdrop: this.hasBackdrop,
      backdropClass: this.backdropClass,
      panelClass: this.panelClass,
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };
  }

  private getPositionStrategy() {
    switch (this.position) {
      case 'above':
        return this.overlay.position().global().top('0px').centerHorizontally();
      case 'below':
        return this.overlay.position().global().bottom('0px').centerHorizontally();
      case 'before':
        return this.overlay.position().global().left('0px').centerVertically();
      case 'after':
        return this.overlay.position().global().right('0px').centerVertically();
      case 'center':
      default:
        return this.overlay.position().global().centerHorizontally().centerVertically();
    }
  }
}

