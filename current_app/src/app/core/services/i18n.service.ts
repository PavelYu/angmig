import { Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  constructor(private translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('en');
    
    // Load saved language preference or use browser language
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = this.translate.getBrowserLang();
    const initialLang = savedLang || (browserLang && this.translate.getLangs().includes(browserLang) ? browserLang : 'en');
    
    this.translate.use(initialLang);
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('preferredLanguage', lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.translate.defaultLang || 'en';
  }

  getAvailableLanguages(): string[] {
    return this.translate.getLangs();
  }
}
