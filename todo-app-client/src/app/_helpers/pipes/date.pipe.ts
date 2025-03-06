import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'appDate'
})
export class DatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    return moment(value).locale('en').format('MMMM Do YYYY, h:mm a');
  }

}
