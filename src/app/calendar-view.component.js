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
//  Import Month class and event-getting service
var month_1 = require("./month");
var event_service_1 = require("./event.service");
var CalendarViewComponent = (function () {
    // Inject event service instance
    function CalendarViewComponent(eventService) {
        this.eventService = eventService;
    }
    // Returns a callback arrow function that is run after getting new events
    CalendarViewComponent.prototype.newEventsCallback = function () {
        var _this = this;
        return (function (events, monthsArr) {
            // Get list of unique months in which events are present...
            var yearMonth = monthsArr[0].split('-').map(function (part) { return parseInt(part); });
            // ... and construct the first month in which they do
            _this.month = new month_1.Month(yearMonth[0], yearMonth[1]);
            // Bind events to a month class instance
            _this.month.bindEvents(events);
        });
    };
    // Run after initializiation
    CalendarViewComponent.prototype.ngOnInit = function () {
        // Get events from the event service, and run a success handler
        this.eventService.getEvents(this.newEventsCallback());
    };
    // Get date object of the first day of the month "neighbouring" the Month class instance,
    // depeneding on the direction in time (negative values = previous, positive values = next, 0 = same)
    CalendarViewComponent.prototype.whatsOtherMonthDate = function (monthOffset) {
        if (monthOffset === void 0) { monthOffset = 0; }
        // Get first day date of the current month
        var oldMonth = this.month.getFirstDayDate();
        // Normalize input, positive to 1, negative to -1
        monthOffset = (monthOffset > 0 ? 1 : (monthOffset < 0 ? -1 : 0));
        // Return date object of the first day of the offset month
        return new Date(oldMonth.getFullYear(), oldMonth.getMonth() + Math.round(monthOffset), 1);
    };
    // Does the neighbouring month have any events?
    CalendarViewComponent.prototype.hasOtherMonthAnyEvents = function (monthOffset) {
        // End with false when Month class instance is not defined
        if (this.month === undefined) {
            return false;
        }
        // Get neighbouring month
        var newMonth = this.whatsOtherMonthDate(monthOffset);
        // Prepare neighbouring month signature (eg. '2017-6')
        var signature = newMonth.getFullYear() + '-' + newMonth.getMonth();
        // If the signature can be found in the event service's unique event-having month set, the answer is true
        if (Array.from(this.eventService.months).indexOf(signature) !== -1) {
            return true;
        }
        // Otherwise false
        return false;
    };
    // Method for scrolling between months
    CalendarViewComponent.prototype.changeMonth = function (monthOffset) {
        if (monthOffset === void 0) { monthOffset = 0; }
        // End when Month class instance is not defined
        if (this.month === undefined) {
            return;
        }
        // If user asks for a current month
        if (monthOffset === 0) {
            // Set Month class properties with default parameters (current month)
            this.month.setMonth();
        }
        else {
            // If not, get neighbouring month and "reconstruct" the Month class
            var newMonth = this.whatsOtherMonthDate(monthOffset);
            this.month.setMonth(newMonth.getFullYear(), newMonth.getMonth());
        }
        // Bind events to a chosen month
        this.month.bindEvents(this.eventService.events);
    };
    return CalendarViewComponent;
}());
CalendarViewComponent = __decorate([
    core_1.Component({
        selector: 'calendar-view',
        encapsulation: core_1.ViewEncapsulation.None,
        templateUrl: './calendar-view.component.html'
    }),
    __metadata("design:paramtypes", [event_service_1.EventService])
], CalendarViewComponent);
exports.CalendarViewComponent = CalendarViewComponent;
//# sourceMappingURL=calendar-view.component.js.map