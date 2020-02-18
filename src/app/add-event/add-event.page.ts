import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { EventService } from "../service/event.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.page.html",
  styleUrls: ["./add-event.page.scss"]
})
export class AddEventPage implements OnInit {
  // get current date
  currentDate = new Date();
  isUpdateEvent: boolean = false;

  // form prioperty
  eventForm: any;

  constructor(
    private datePipe: DatePipe,
    private eventService: EventService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
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
      adminMobileNumber: new FormControl("9805"),
      adminUserId: new FormControl("E1p75Yi7MjT7bfjAxZjcVCq5gyy1"),
      participantUserId: new FormControl("VTMzojHjMFMCRfMslIDHd1rJCM23")
    });
    // get route params
    this.activatedRoute.params.subscribe(params => {
      // check has params
      if (Object.keys(params).length) {
        this.isUpdateEvent = true;
        this.eventService.getSingleEvent(params.id).subscribe(data => {
          console.log(data);
          this.eventForm.patchValue({
            eventName: data.eventName,
            eventDescription: data.eventDescription,
            eventType: data.eventType,
            amount: data.amount,
            startDate: data.startDate
          });
        });
      } else {
        this.isUpdateEvent = false;
      }
    });
  }

  ngOnInit() {}

  // add event
  addEvent() {
    console.log(this.eventForm.value);
    this.eventService.addEvent(this.eventForm.value).then(res => {
      console.log(res);
    });
    this.eventForm.reset();
    this.router.navigate(["/dashboard"]);
  }
}
