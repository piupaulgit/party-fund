import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { EventService } from "../service/event.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.page.html",
  styleUrls: ["./add-event.page.scss"]
})
export class AddEventPage implements OnInit {
  // get current date
  currentDate = new Date();

  // form prioperty
  eventForm: any;

  constructor(private datePipe: DatePipe, private eventService: EventService, private router: Router) {
    // change date format
    const currentDateFormat = this.datePipe.transform(
      this.currentDate,
      "yyyy-MM-dd"
    );

    // crete form group
    this.eventForm = new FormGroup({
      eventName: new FormControl(""),
      eventDescription: new FormControl(""),
      eventType: new FormControl(""),
      amount: new FormControl(""),
      startDate: new FormControl(currentDateFormat),
      adminMobileNumber: new FormControl("")
    });
  }

  ngOnInit() {}

  // add event
  addEvent() {
    console.log(this.eventForm.value);
    this.eventService.addEvent(this.eventForm.value)
      .then(res => {
        console.log(res);
      })
	    this.router.navigate(['/dashboard']);
  }
}
