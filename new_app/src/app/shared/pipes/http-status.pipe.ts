import { Pipe, PipeTransform } from '@angular/core';
import { getReasonPhrase } from 'http-status-codes';

@Pipe({
    name: 'httpStatus',
    standalone: false
})
export class HttpStatusPipe implements PipeTransform {
  transform(statusCode: number | string | null | undefined): string {
    if (statusCode === null || statusCode === undefined) {
      return 'Unknown Status';
    }

    const code = typeof statusCode === 'string' ? parseInt(statusCode, 10) : statusCode;
    
    try {
      return getReasonPhrase(code);
    } catch (error) {
      return `Status ${code}`;
    }
  }
}

