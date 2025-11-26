import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(value: number | string, currencyCode: string = 'USD'): string {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(num);
  }
}
