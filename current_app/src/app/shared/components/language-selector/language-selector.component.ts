import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '../../../core/services/i18n.service';

export interface Language {
  code: string;
  label: string;
  flag?: string;
}

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  languages: Language[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'zh', label: '中文', flag: '🇨🇳' }
  ];

  currentLanguage: string = 'en';

  constructor(
    private translateService: TranslateService,
    private i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.translateService.currentLang || this.translateService.defaultLang || 'en';
  }

  changeLanguage(langCode: string): void {
    this.currentLanguage = langCode;
    this.translateService.use(langCode);
    this.i18nService.setLanguage(langCode);
    
    // Persist language preference
    localStorage.setItem('preferredLanguage', langCode);
  }

  getCurrentLanguageLabel(): string {
    const lang = this.languages.find(l => l.code === this.currentLanguage);
    return lang ? lang.label : 'English';
  }

  getCurrentLanguageFlag(): string {
    const lang = this.languages.find(l => l.code === this.currentLanguage);
    return lang?.flag || '🌐';
  }
}

