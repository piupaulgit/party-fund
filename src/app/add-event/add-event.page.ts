import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { EventService } from "../service/event.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SharedService } from "../service/shared.service";
import { AlertController } from "@ionic/angular";

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

  // eventId
  eventId: string;

  constructor(
    private datePipe: DatePipe,
    private eventService: EventService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private alertController: AlertController
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
      this.eventId = params.id;
      // check has params
      if (Object.keys(params).length) {
        this.isUpdateEvent = true;
        this.eventService.getSingleEvent(params.id).subscribe(data => {
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

  // add/update event
  addEvent() {
    // for update event
    if (this.isUpdateEvent) {
      this.eventService.updateEvent(this.eventId, this.eventForm.value).then(
        success => {
          this.sharedService.showToaster(
            "Event updated successfully",
            "success"
          );
          this.router.navigate(["/dashboard"]);
        },
        err => {
          this.sharedService.showToaster(
            err.message ? err.message : "PLease try again",
            "danger"
          );
        }
      );
      console.log(this.eventForm.value);
    } else {
      // for new evnt
      this.eventService.addEvent(this.eventForm.value).then(res => {
        console.log(res);
      });
      this.eventForm.reset();
      this.router.navigate(["/dashboard"]);
    }
  }

  // delete event
  async deleteEvent() {
    if (this.isUpdateEvent) {
      const alert = await this.alertController.create({
        header: "Confirm!",
        message: "Do you want to <strong>Delete?</strong>",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: blah => {
              console.log("Confirm Cancel: blah");
            }
          },
          {
            text: "Yes",
            handler: () => {
              this.eventService.deleteEvent(this.eventId).then(
                success => {
                  this.sharedService.showToaster(
                    "Event Deleted successfully",
                    "success"
                  );
                  this.router.navigate(["/dashboard"]);
                },
                err => {
                  this.sharedService.showToaster("PLease try again", "danger");
                }
              );
            }
          }
        ]
      });

      await alert.present();
    }
  }
}
