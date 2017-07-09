import { Weekday } from './weekday';
import { MonthWeek } from './month-week';

import { LONGMONTHNAMES} from './constants';

export class Month {
	year: number;
	month: number;
	weeks: MonthWeek[] = [];

	public setMonth(year: number = -1, month: number = -1): boolean {

		// Assign default values if neccessary
		var now = new Date();
		year = year === -1 ? now.getFullYear() : year;
		month = month === -1 ? now.getMonth() : month;

		// Assign class properties
		this.year = year;
		this.month = month;

		// Get first and last day of the month
		var firstDay = new Date(year, month, 1);
		var lastDay = new Date(year, month+1, 0);

		// Offset first day, so that it's the first preceeding monday if necessary
		var offset = (firstDay.getDay() + 6) % 7 -1;
		firstDay = new Date(year, firstDay.getMonth(), -offset);

		// Offset last day, so that it's first succeeding sunday if necessary
		offset = 6 - ((lastDay.getDay() + 6) % 7);
		lastDay = new Date(year, lastDay.getMonth(), lastDay.getDate()+offset);

		// Iterate through all days, build weeks
		this.weeks = [];
		var currDay = firstDay;
		var weekdays: Weekday[] = [];

		while (currDay.valueOf() <= lastDay.valueOf()) {
			weekdays.push( new Weekday(currDay) );

			// If week has all days, push the new MonthWeek to weeks array
			if (weekdays.length === 7) {
				this.weeks.push( new MonthWeek(weekdays) );
				weekdays = [];
			}

			currDay = new Date(currDay.getFullYear(), currDay.getMonth(), currDay.getDate()+1);
		}

		return true;
	}

	// Bind events to a given month
	public bindEvents(events: any[] = []) {

		var that = this;

		// Assign all events that happend during given day
		function findEvents(day: Weekday): any {
			for (let i=0; i<events.length; i++) {
				var event = events[i];

				// Only the "class month"
				if (event.time.getFullYear() !== that.year) { continue; }
				if (event.time.getMonth() !== that.month) { continue; }

				// If dates are the same, push it and rewrite the original event index
				if (day.monthDay === event.time.getDate()) {
					day.events.push(event);
					day.events[day.events.length-1].index = i;
				}
			}
		}

		// Iterate throug weeks
		for (let i=0; i<that.weeks.length; i++) {
			let week = that.weeks[i];

			// Iterate through days of the week
			for (let j=0; j<week.weekdays.length; j++) {
				let day = week.weekdays[j];

				// Reset the current day events list, assign the events
				day.events = [];
				findEvents(day);
			}
		}
	}

	// Get month long name
	public getMonthStr(): string {
		if (typeof this.month !== 'undefined') {
			return LONGMONTHNAMES[ this.month ];
		}
		return '';
	}

	// Get date object of the first day of the month
	public getFirstDayDate(): Date {
		return new Date(this.year, this.month, 1);
	}
	constructor(year: number = -1, month: number = -1) {
		this.setMonth(year, month);
	}
}