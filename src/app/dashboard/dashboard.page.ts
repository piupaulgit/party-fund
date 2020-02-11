import { Component, OnInit } from "@angular/core";
import { EventService } from "../service/event.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  public cards$: Observable<any>;
  BookData: any = [];
  dataSource: any;
  constructor(private eventService: EventService) {
    this.dataSource = [];
    this.eventService
      .getAllEvents()
      .subscribe(data => (this.dataSource = data));
  }

  ngOnInit() {
    console.log(this.dataSource);
  }
}
