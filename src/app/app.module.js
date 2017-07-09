"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Import core elements
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
// Import project components
var app_component_1 = require("./app.component");
var calendar_component_1 = require("./calendar.component");
var calendar_view_component_1 = require("./calendar-view.component");
var event_detail_component_1 = require("./event-detail.component");
// Import event service
var event_service_1 = require("./event.service");
// Import router module
var router_1 = require("@angular/router");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            // Routing rules
            router_1.RouterModule.forRoot([
                {
                    path: 'calendar',
                    component: calendar_view_component_1.CalendarViewComponent
                },
                // Empty string redirects to calendar
                {
                    path: '',
                    redirectTo: '/calendar',
                    pathMatch: 'full'
                },
                // Rule for obtaining event info
                {
                    path: 'event/:index',
                    component: event_detail_component_1.EventDetailComponent
                },
                // Everything else also redirects to calendar
                {
                    path: '**',
                    redirectTo: '/calendar'
                }
            ])
        ],
        // Services used throughout the app
        providers: [
            event_service_1.EventService
        ],
        // All components used throughout the app
        declarations: [
            app_component_1.AppComponent,
            calendar_component_1.CalendarComponent,
            calendar_view_component_1.CalendarViewComponent,
            event_detail_component_1.EventDetailComponent
        ],
        bootstrap: [
            app_component_1.AppComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map