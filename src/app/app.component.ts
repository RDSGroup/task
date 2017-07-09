// Import core elements
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// Import project components
import { CalendarViewComponent } from './calendar-view.component';
import { EventDetailComponent } from './event-detail.component';

// Import event service
import { EventService } from './event.service';

// Main application component
@Component({
  selector: 'my-app',
  //encapsulation: ViewEncapsulation.None,
  template: `
  <h1>Kalendarz wydarzeń</h1>
  <router-outlet></router-outlet>
  <p>Autor: Jakub Chmielewski</p>`
})
export class AppComponent {


	// Nothing so far
}
