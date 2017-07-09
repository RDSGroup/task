"use strict";
var weekday_1 = require("./weekday");
var month_week_1 = require("./month-week");
var constants_1 = require("./constants");
var Month = (function () {
    function Month(year, month) {
        if (year === void 0) { year = -1; }
        if (month === void 0) { month = -1; }
        this.weeks = [];
        this.setMonth(year, month);
    }
    Month.prototype.setMonth = function (year, month) {
        if (year === void 0) { year = -1; }
        if (month === void 0) { month = -1; }
        // Assign default values if neccessary
        var now = new Date();
        year = year === -1 ? now.getFullYear() : year;
        month = month === -1 ? now.getMonth() : month;
        // Assign class properties
        this.year = year;
        this.month = month;
        // Get first and last day of the month
        var firstDay = new Date(year, month, 1);
        var lastDay = new Date(year, month + 1, 0);
        // Offset first day, so that it's the first preceeding monday if necessary
        var offset = (firstDay.getDay() + 6) % 7 - 1;
        firstDay = new Date(year, firstDay.getMonth(), -offset);
        // Offset last day, so that it's first succeeding sunday if necessary
        offset = 6 - ((lastDay.getDay() + 6) % 7);
        lastDay = new Date(year, lastDay.getMonth(), lastDay.getDate() + offset);
        // Iterate through all days, build weeks
        this.weeks = [];
        var currDay = firstDay;
        var weekdays = [];
        while (currDay.valueOf() <= lastDay.valueOf()) {
            weekdays.push(new weekday_1.Weekday(currDay));
            // If week has all days, push the new MonthWeek to weeks array
            if (weekdays.length === 7) {
                this.weeks.push(new month_week_1.MonthWeek(weekdays));
                weekdays = [];
            }
            currDay = new Date(currDay.getFullYear(), currDay.getMonth(), currDay.getDate() + 1);
        }
        return true;
    };
    // Bind events to a given month
    Month.prototype.bindEvents = function (events) {
        if (events === void 0) { events = []; }
        var that = this;
        // Assign all events that happend during given day
        function findEvents(day) {
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                // Only the "class month"
                if (event.time.getFullYear() !== that.year) {
                    continue;
                }
                if (event.time.getMonth() !== that.month) {
                    continue;
                }
                // If dates are the same, push it and rewrite the original event index
                if (day.monthDay === event.time.getDate()) {
                    day.events.push(event);
                    day.events[day.events.length - 1].index = i;
                }
            }
        }
        // Iterate throug weeks
        for (var i = 0; i < that.weeks.length; i++) {
            var week = that.weeks[i];
            // Iterate through days of the week
            for (var j = 0; j < week.weekdays.length; j++) {
                var day = week.weekdays[j];
                // Reset the current day events list, assign the events
                day.events = [];
                findEvents(day);
            }
        }
    };
    // Get month long name
    Month.prototype.getMonthStr = function () {
        if (typeof this.month !== 'undefined') {
            return constants_1.LONGMONTHNAMES[this.month];
        }
        return '';
    };
    // Get date object of the first day of the month
    Month.prototype.getFirstDayDate = function () {
        return new Date(this.year, this.month, 1);
    };
    return Month;
}());
exports.Month = Month;
//# sourceMappingURL=month.js.map