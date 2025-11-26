import { Component } from '@angular/core';

@Component({
  selector: 'app-activity-feed',
  template: `
    <div class="feed-container" infiniteScroll (scrolled)="onScroll()">
      <h3>Activity Feed</h3>
      <div class="feed-item" *ngFor="let item of items">
        <div class="avatar">{{ item.user[0] }}</div>
        <div class="content">
          <div class="message"><strong>{{ item.user }}</strong> {{ item.action }}</div>
          <div class="time">{{ item.time }}</div>
        </div>
      </div>
      <div *ngIf="isLoading" class="loading">Loading more...</div>
    </div>
  `,
  styles: [`
    .feed-container { height: 300px; overflow-y: scroll; border: 1px solid #eee; padding: 10px; }
    .feed-item { display: flex; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
    .avatar { width: 32px; height: 32px; background: #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; }
    .time { font-size: 12px; color: #999; }
    .loading { text-align: center; padding: 10px; color: #666; }
  `]
})
export class ActivityFeedComponent {
  items: any[] = [];
  isLoading = false;

  constructor() {
    this.addItems(10);
  }

  onScroll() {
    this.isLoading = true;
    setTimeout(() => {
      this.addItems(5);
      this.isLoading = false;
    }, 1000);
  }

  addItems(count: number) {
    for (let i = 0; i < count; i++) {
      this.items.push({
        user: `User ${this.items.length + 1}`,
        action: 'updated a record',
        time: '2 mins ago'
      });
    }
  }
}
