"use strict";
var constants_1 = require("./constants");
var Weekday = (function () {
    function Weekday(date, events) {
        if (events === void 0) { events = []; }
        this.day = date.getDay();
        this.month = date.getMonth();
        this.monthDay = date.getDate();
        this.events = events;
    }
    Weekday.prototype.getMonthDayStr = function (longName, shownMonth) {
        if (longName === void 0) { longName = false; }
        if (shownMonth === void 0) { shownMonth = -1; }
        if (shownMonth !== -1 && shownMonth !== this.month) {
            return '';
        }
        if (longName === true) {
            return constants_1.SHORTWEEKDAYNAMES[this.day];
        }
        else {
            return constants_1.LONGWEEKDAYNAMES[this.day];
        }
    };
    return Weekday;
}());
exports.Weekday = Weekday;
//# sourceMappingURL=weekday.js.map