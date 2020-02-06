import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
@Injectable({
  providedIn: "root"
})
export class EventService {
  events$: AngularFireList<any>;
  eventRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.events$ = this.db.list("/events");
  }

  addEvent(event) {
    this.events$
      .push({
        eventName: event.eventName,
        eventDescription: event.eventDescription,
        eventType: event.eventType,
        amount: event.amount,
        startDate: event.startDate,
        adminMobileNumber: event.adminMobileNumber
      })
      .catch(error => {
        this.errorHandelor(error);
      });
  }

  private errorHandelor(error) {
    console.log(error);
  }
}
