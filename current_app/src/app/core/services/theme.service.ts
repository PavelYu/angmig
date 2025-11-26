import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkSubject = new BehaviorSubject<boolean>(false);
  public isDark$ = this.isDarkSubject.asObservable();

  constructor() {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.setDark(true);
    }
  }

  toggleTheme(): void {
    this.setDark(!this.isDarkSubject.value);
  }

  private setDark(isDark: boolean): void {
    this.isDarkSubject.next(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
