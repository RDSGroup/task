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
// Import routing and location modules
var router_1 = require("@angular/router");
//import { Location } from '@angular/common';
// Import project services
var event_service_1 = require("./event.service");
// Import switch map operator
require("rxjs/add/operator/switchMap");
var EventDetailComponent = (function () {
    function EventDetailComponent(eventService, route, router //,
    ) {
        this.eventService = eventService;
        this.route = route;
        this.router = router; //,
        // All events from a event service, picked event index and picked event
        this.events = [];
    }
    // Run after initializiation
    EventDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var selectedIndex = null;
        // Get router parameters
        this.route.paramMap
            .switchMap(function (params) { return params.get('index'); })
            .subscribe(function (index) {
            // Assume the pindex parameter is an integer
            _this.eventIndex = Math.round(parseInt(index));
            // If it's not valid, redirect to calendar
            if (isNaN(_this.eventIndex)) {
                _this.router.navigate(['calendar']);
            }
            // Get events for this component's class
            _this.getEvents();
        });
    };
    // Aquire events
    EventDetailComponent.prototype.getEvents = function () {
        var _this = this;
        // Get events from the service with callback function
        this.eventService.getEvents(function (events) {
            // Assign events array to a class property
            _this.events = events;
            // If picked event index is a proper numer, pick the event
            if (typeof _this.eventIndex === 'number') {
                _this.pickEvent();
            }
        });
    };
    // Picke event with eventIndex index
    EventDetailComponent.prototype.pickEvent = function () {
        // If the event index is out of bounds, redirect to calendar
        if (this.eventIndex >= this.events.length || this.eventIndex < 0) {
            this.router.navigate(['calendar']);
        }
        this.event = this.events[this.eventIndex];
    };
    return EventDetailComponent;
}());
EventDetailComponent = __decorate([
    core_1.Component({
        selector: 'event-detail',
        templateUrl: './event-detail.component.html'
    }),
    __metadata("design:paramtypes", [event_service_1.EventService,
        router_1.ActivatedRoute,
        router_1.Router //,
    ])
], EventDetailComponent);
exports.EventDetailComponent = EventDetailComponent;
//# sourceMappingURL=event-detail.component.js.map