import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  // Array utilities
  chunk<T>(array: T[], size: number): T[][] {
    return _.chunk(array, size);
  }

  compact<T>(array: (T | null | undefined | false | 0 | '')[]): T[] {
    return _.compact(array);
  }

  uniq<T>(array: T[]): T[] {
    return _.uniq(array);
  }

  uniqBy<T>(array: T[], iteratee: string | ((item: T) => any)): T[] {
    return _.uniqBy(array, iteratee);
  }

  // Object utilities
  clone<T>(value: T): T {
    return _.clone(value);
  }

  cloneDeep<T>(value: T): T {
    return _.cloneDeep(value);
  }

  merge<T extends object>(target: T, ...sources: Partial<T>[]): T {
    return _.merge(target, ...sources);
  }

  pick<T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K> {
    return _.pick(object, keys);
  }

  omit<T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K> {
    return _.omit(object, keys);
  }

  // Function utilities
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    options?: _.DebounceSettings
  ): _.DebouncedFunc<T> {
    return _.debounce(func, wait, options);
  }

  throttle<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    options?: _.ThrottleSettings
  ): _.DebouncedFunc<T> {
    return _.throttle(func, wait, options);
  }

  // String utilities
  camelCase(str: string): string {
    return _.camelCase(str);
  }

  kebabCase(str: string): string {
    return _.kebabCase(str);
  }

  snakeCase(str: string): string {
    return _.snakeCase(str);
  }

  startCase(str: string): string {
    return _.startCase(str);
  }

  // Number utilities
  random(min: number, max: number): number {
    return _.random(min, max);
  }

  // Collection utilities
  groupBy<T>(collection: T[], iteratee: string | ((item: T) => any)): _.Dictionary<T[]> {
    return _.groupBy(collection, iteratee);
  }

  orderBy<T>(
    collection: T[],
    iteratees: string | string[] | ((item: T) => any) | Array<(item: T) => any>,
    orders?: 'asc' | 'desc' | Array<'asc' | 'desc'>
  ): T[] {
    return _.orderBy(collection, iteratees, orders);
  }

  // Type checking
  isEmpty(value: any): boolean {
    return _.isEmpty(value);
  }

  isEqual(value: any, other: any): boolean {
    return _.isEqual(value, other);
  }

  // Date utilities (using moment-like patterns)
  formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    // Simple date formatting (in production, use moment or date-fns)
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day);
  }
}

