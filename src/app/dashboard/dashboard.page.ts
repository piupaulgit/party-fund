import { Component, OnInit } from "@angular/core";
import { EventService } from "../service/event.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  public cards$: Observable<any>;
  adminEvents: any = [];
  participantEvents: any = [];
  dataSource: any;
  constructor(private eventService: EventService, private router: Router) {
    let dataSource = [];
    this.eventService.getAllEvents().subscribe(data => {
      // Get events created by user
      this.adminEvents = data.filter(
        item => item.adminUserId === "E1p75Yi7MjT7bfjAxZjcVCq5gyy1"
      );

      // get events that user is being perticipating
      this.participantEvents = data.filter(
        item => item.participantUserId === "E1p75Yi7MjT7bfjAxZjcVCq5gyy1"
      );
    });
  }

  ngOnInit() {
    console.log(this.dataSource);
  }

  updateEvent(key) {
    console.log(event);
    this.router.navigateByUrl(`add-event/${key}`);
  }
}
