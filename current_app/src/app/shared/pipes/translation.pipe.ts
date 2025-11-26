import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'appTranslate',
  pure: false
})
export class TranslationPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(key: string, params?: any): string {
    if (!key) {
      return '';
    }

    let translation = this.translateService.instant(key, params);

    // Fallback to key if translation not found
    if (translation === key) {
      console.warn(`Translation missing for key: ${key}`);
      // Return formatted key as fallback
      return key.split('.').pop() || key;
    }

    return translation;
  }
}

