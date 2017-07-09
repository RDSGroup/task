// Import core elements
import { Component, OnInit, Input} from '@angular/core';

// Import routing and location modules
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
//import { Location } from '@angular/common';

// Import project services
import { EventService } from './event.service';

// Import switch map operator
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit {

  // All events from a event service, picked event index and picked event
  events: any[] = [];
  eventIndex: number;
  event: any;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router//,
    //private location: Location
  ) { }

  // Run after initializiation
  ngOnInit(): void {

    var selectedIndex = null;

    // Get router parameters
    this.route.paramMap

              // Extract index parameter
              .switchMap((params: ParamMap) => params.get('index'))

              // Set event emitter handler
              .subscribe(index => {

                // Assume the pindex parameter is an integer
                this.eventIndex = Math.round(parseInt(index));

                // If it's not valid, redirect to calendar
                if (isNaN(this.eventIndex)) {
                  this.router.navigate(['calendar']);
                }

                // Get events for this component's class
                this.getEvents();
              });
  }

  // Aquire events
  getEvents(): void {

    // Get events from the service with callback function
    this.eventService.getEvents((events: any) => {

      // Assign events array to a class property
      this.events = events;

      // If picked event index is a proper numer, pick the event
      if (typeof this.eventIndex === 'number') {
        this.pickEvent();
      }
    })
  }

  // Picke event with eventIndex index
  pickEvent(): void {

    // If the event index is out of bounds, redirect to calendar
    if (this.eventIndex >= this.events.length || this.eventIndex < 0) {
      this.router.navigate(['calendar']);
    }
    this.event = this.events[this.eventIndex];
  }
}