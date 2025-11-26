import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface ActivityItem {
  id: string;
  user: string;
  userAvatar?: string;
  action: string;
  target?: string;
  targetType?: 'user' | 'transaction' | 'report' | 'system';
  timestamp: Date;
  icon?: string;
  color?: string;
}

@Component({
  selector: 'app-activity-feed',
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.scss']
})
export class ActivityFeedComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('feedContainer', { static: false }) feedContainer!: ElementRef;

  items: ActivityItem[] = [];
  isLoading = false;
  hasMore = true;
  private page = 0;
  private pageSize = 10;
  private destroy$ = new Subject<void>();

  private actions = [
    { action: 'created', icon: 'add_circle', color: '#4CAF50' },
    { action: 'updated', icon: 'edit', color: '#2196F3' },
    { action: 'deleted', icon: 'delete', color: '#F44336' },
    { action: 'approved', icon: 'check_circle', color: '#4CAF50' },
    { action: 'rejected', icon: 'cancel', color: '#F44336' },
    { action: 'exported', icon: 'file_download', color: '#FF9800' }
  ];

  private users = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Charlie Brown'];
  private targets = ['User Profile', 'Transaction #1234', 'Monthly Report', 'System Settings', 'Dashboard'];

  constructor() {}

  ngOnInit(): void {
    this.loadInitialItems();
    
    // Simulate real-time activity updates
    interval(8000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.addNewActivity();
    });
  }

  ngAfterViewInit(): void {
    this.setupScrollListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupScrollListener(): void {
    if (this.feedContainer) {
      this.feedContainer.nativeElement.addEventListener('scroll', () => {
        const element = this.feedContainer.nativeElement;
        const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
        
        if (atBottom && !this.isLoading && this.hasMore) {
          this.loadMore();
        }
      });
    }
  }

  loadInitialItems(): void {
    this.addItems(this.pageSize);
  }

  loadMore(): void {
    if (this.isLoading || !this.hasMore) return;
    
    this.isLoading = true;
    setTimeout(() => {
      this.page++;
      this.addItems(this.pageSize);
      this.isLoading = false;
      
      // Simulate end of data
      if (this.items.length >= 50) {
        this.hasMore = false;
      }
    }, 800);
  }

  private addItems(count: number): void {
    for (let i = 0; i < count; i++) {
      this.items.unshift(this.generateActivityItem());
    }
  }

  private addNewActivity(): void {
    this.items.unshift(this.generateActivityItem());
    
    // Keep max 100 items
    if (this.items.length > 100) {
      this.items = this.items.slice(0, 100);
    }
  }

  private generateActivityItem(): ActivityItem {
    const actionData = this.actions[Math.floor(Math.random() * this.actions.length)];
    const user = this.users[Math.floor(Math.random() * this.users.length)];
    const target = Math.random() > 0.3 ? this.targets[Math.floor(Math.random() * this.targets.length)] : undefined;
    const targetType = target?.includes('User') ? 'user' : 
                      target?.includes('Transaction') ? 'transaction' :
                      target?.includes('Report') ? 'report' : 'system';

    return {
      id: Math.random().toString(36).substr(2, 9),
      user,
      userAvatar: user.charAt(0),
      action: actionData.action,
      target,
      targetType,
      timestamp: new Date(Date.now() - Math.random() * 3600000), // Random time in last hour
      icon: actionData.icon,
      color: actionData.color
    };
  }

  getTimeAgo(timestamp: Date): string {
    const seconds = Math.floor((new Date().getTime() - timestamp.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  onItemClick(item: ActivityItem): void {
    // Navigate to target if applicable
    console.log('Activity clicked:', item);
  }
}
