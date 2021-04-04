import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToIso'
})
export class DateToIsoPipe implements PipeTransform {

  transform(value, ...args: unknown[]) {
    let newValue = new Date(value).toISOString();
    return newValue;
  }

}
