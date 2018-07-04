import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'split' })
export class SplitPipe implements PipeTransform {
  transform(value: string, index: number): string {
    const splits = value.split(',');
    if (splits.length > 1) {
      return splits[index];
    } else {
      return '';
    }
  }
}
