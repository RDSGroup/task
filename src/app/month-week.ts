import { Weekday } from './weekday';

export class MonthWeek {
	weekdays: Weekday[];

	constructor(weekdays: Weekday[]) {
		this.weekdays = weekdays;
	}
}