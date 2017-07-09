// Import core elements
import { Component, Input, ViewEncapsulation } from '@angular/core';

//  Import Month class
import { Month } from './month';

// Import weekday names
import { SHORTWEEKDAYNAMES } from './constants';

@Component({
  selector: 'calendar',
  //encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar.component.html',

  // TODO Temporary styles
  styles: [
  	/*'table { width: 100%; border-collapse: collapse; }',
  	'div { text-align: center; }',
  	'td { text-align: center; width: 14.2857%; vertical-align: top; }',
  	'td div { padding: 8px 0px; }',
    'ul { list-style-type: none; padding: 0; }',
    'div p { font-weight: bold; }'*/
  ]
})
export class CalendarComponent  {

  // Input decorator for a month Class
	@Input() m: Month;

  // Short weekday names
	dayNames: string[] = SHORTWEEKDAYNAMES;

  // Return "HH:mm" time format from a date
  private formatTime(date: Date) {

    var parts = [date.getHours(),
                 date.getMinutes()].map(part => (part.toString().length === 1 ? '0'+part : part.toString()));
    return parts.join(':');

  }  
}