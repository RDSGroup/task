// Import core elements
import { Injectable } from '@angular/core';

// Import available data urls
import { DATAURL } from './constants';

// Import xmlhttprequest classes and necessary operators
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

// Parse event time property, or set it to null if it's not valid
function timePropertyParser(event: any): Date {
  try {
    event.time = new Date(event.time);
  } catch (error) {
    event.time = null;
  }
  return event;
}

@Injectable()
export class EventService {

  // Events list, and an unique list of months in which the events are present
  events: any[] = [];
  months: any[];

  // Data url
  private dataUrl: string = DATAURL;

  // Inject Http class instance
  constructor (private http: Http) {}
  
  // Get events from a events.json file, with callback
  public getEvents(successHandler: Function = null) {

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

        // 
        .map(res => res.json())

        // 
        .subscribe(events => {

          // Try parsing events dates
          this.events = events.map(timePropertyParser);

          // Filter out events with invalid dates
          this.events.filter(event => event.time !== null);

          // Prepare a list of unique months which have events in them ("signatures" used in "calendar-view.component")
          var tempList = new Set();
          this.events.map(event => {
            tempList.add(event.time.getFullYear()+'-'+event.time.getMonth());
          });
          this.months = Array.from(tempList);

          // If a callback function is present invoke it with class parameters 
          if (typeof successHandler === 'function') {
            successHandler(this.events, this.months);
          }
        });
  }
}