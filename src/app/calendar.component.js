"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Import core elements
var core_1 = require("@angular/core");
//  Import Month class
var month_1 = require("./month");
// Import weekday names
var constants_1 = require("./constants");
var CalendarComponent = (function () {
    function CalendarComponent() {
        // Short weekday names
        this.dayNames = constants_1.SHORTWEEKDAYNAMES;
    }
    // Return "HH:mm" time format from a date
    CalendarComponent.prototype.formatTime = function (date) {
        var parts = [date.getHours(),
            date.getMinutes()].map(function (part) { return (part.toString().length === 1 ? '0' + part : part.toString()); });
        return parts.join(':');
    };
    return CalendarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", month_1.Month)
], CalendarComponent.prototype, "m", void 0);
CalendarComponent = __decorate([
    core_1.Component({
        selector: 'calendar',
        //encapsulation: ViewEncapsulation.None,
        templateUrl: './calendar.component.html',
        // TODO Temporary styles
        styles: []
    })
], CalendarComponent);
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map