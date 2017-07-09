import { SHORTWEEKDAYNAMES, LONGWEEKDAYNAMES} from './constants';

export class Weekday {
	month: number;
	day: number;
	monthDay: number;
	events: any[];

	public getMonthDayStr(longName: boolean = false, shownMonth: number = -1): string {
		if ( shownMonth !== -1 && shownMonth !== this.month ) {
			return '';
		}
		if (longName === true) {
			return SHORTWEEKDAYNAMES[ this.day ];
		} else {
			return LONGWEEKDAYNAMES[ this.day ];
		}
	}

	constructor(date: Date, events:any[] = []) {
		this.day = date.getDay();
		this.month = date.getMonth();
		this.monthDay = date.getDate();
		this.events = events;
	}
}