// Import core elements
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Import project components
import { AppComponent }  from './app.component';
import { CalendarComponent } from './calendar.component';
import { CalendarViewComponent } from './calendar-view.component';
import { EventDetailComponent } from './event-detail.component';

// Import event service
import { EventService } from './event.service';

// Import router module
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
  	BrowserModule,
  	HttpModule,
    FormsModule,

    // Routing rules
    RouterModule.forRoot([
      {
        path: 'calendar',
        component: CalendarViewComponent
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
        component: EventDetailComponent
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
    EventService
  ],

  // All components used throughout the app
  declarations: [
  	AppComponent,
  	CalendarComponent,
  	CalendarViewComponent,
    EventDetailComponent

  ],
  bootstrap: [
	  AppComponent
  ]
})
export class AppModule { }
