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
// Import available data urls
var constants_1 = require("./constants");
// Import xmlhttprequest classes and necessary operators
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
// Parse event time property, or set it to null if it's not valid
function timePropertyParser(event) {
    try {
        event.time = new Date(event.time);
    }
    catch (error) {
        event.time = null;
    }
    return event;
}
var EventService = (function () {
    // Inject Http class instance
    function EventService(http) {
        this.http = http;
        // Events list, and an unique list of months in which the events are present
        this.events = [];
        // Data url
        this.dataUrl = constants_1.DATAURL;
    }
    // Get events from a events.json file, with callback
    EventService.prototype.getEvents = function (successHandler) {
        var _this = this;
        if (successHandler === void 0) { successHandler = null; }
        // If events list is not empty present, end
        if (this.events.length > 0) {
            // If a callback function is present invoke it with class parameters 
            if (typeof successHandler === 'function') {
                successHandler(this.events, this.months);
            }
            return;
        }
        // Reset class properties
        this.events = [];
        this.months = [];
        // Perform get request
        this.http.get(this.dataUrl)
            .map(function (res) { return res.json(); })
            .subscribe(function (events) {
            // Try parsing events dates
            _this.events = events.map(timePropertyParser);
            // Filter out events with invalid dates
            _this.events.filter(function (event) { return event.time !== null; });
            // Prepare a list of unique months which have events in them ("signatures" used in "calendar-view.component")
            var tempList = new Set();
            _this.events.map(function (event) {
                tempList.add(event.time.getFullYear() + '-' + event.time.getMonth());
            });
            _this.months = Array.from(tempList);
            // If a callback function is present invoke it with class parameters 
            if (typeof successHandler === 'function') {
                successHandler(_this.events, _this.months);
            }
        });
    };
    return EventService;
}());
EventService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map