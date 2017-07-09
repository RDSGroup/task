// Import core elements
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

//  Import Month class and event-getting service
import { Month } from './month';
import { EventService } from './event.service';

// Import weekday names
import { SHORTWEEKDAYNAMES } from './constants';

@Component({
  selector: 'calendar-view',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar-view.component.html'
})
export class CalendarViewComponent implements OnInit {

  // Displayed calendar Month class
  month: Month;

  // Inject event service instance
  constructor(private eventService: EventService) { }

  // Returns a callback arrow function that is run after getting new events
  newEventsCallback(): Function {
    return ((events: any[], monthsArr: any[]) => {

      // Get list of unique months in which events are present...
      let yearMonth  = monthsArr[0].split('-').map((part: any) => parseInt(part));

      // ... and construct the first month in which they do
      this.month = new Month(yearMonth[0], yearMonth[1]);

      // Bind events to a month class instance
      this.month.bindEvents(events);
    });
  }

  // Run after initializiation
  ngOnInit(): void {
  	
    // Get events from the event service, and run a success handler
    this.eventService.getEvents( this.newEventsCallback() );
  }

  // Get date object of the first day of the month "neighbouring" the Month class instance,
  // depeneding on the direction in time (negative values = previous, positive values = next, 0 = same)
  private whatsOtherMonthDate(monthOffset: number = 0 ): Date {

    // Get first day date of the current month
    var oldMonth = this.month.getFirstDayDate();

    // Normalize input, positive to 1, negative to -1
    monthOffset = (monthOffset > 0 ? 1 : ( monthOffset < 0 ? -1 : 0 ) );

    // Return date object of the first day of the offset month
    return new Date(oldMonth.getFullYear(), oldMonth.getMonth()+Math.round(monthOffset), 1);
  }

  // Does the neighbouring month have any events?
  private hasOtherMonthAnyEvents(monthOffset: number): boolean {

    // End with false when Month class instance is not defined
    if (this.month === undefined) { return false; }

    // Get neighbouring month
    var newMonth = this.whatsOtherMonthDate(monthOffset);

    // Prepare neighbouring month signature (eg. '2017-6')
    var signature = newMonth.getFullYear()+'-'+newMonth.getMonth();

    // If the signature can be found in the event service's unique event-having month set, the answer is true
    if (Array.from(this.eventService.months).indexOf(signature) !== -1) {
      return true;
    }

    // Otherwise false
    return false;
  }

  // Method for scrolling between months
  public changeMonth(monthOffset: number = 0): void {

    // End when Month class instance is not defined
    if (this.month === undefined) { return; }

    // If user asks for a current month
    if (monthOffset === 0) {

      // Set Month class properties with default parameters (current month)
      this.month.setMonth();
    } else {

      // If not, get neighbouring month and "reconstruct" the Month class
      var newMonth = this.whatsOtherMonthDate(monthOffset);
      this.month.setMonth(newMonth.getFullYear(), newMonth.getMonth());
    }

    // Bind events to a chosen month
    this.month.bindEvents(this.eventService.events);
  }
}