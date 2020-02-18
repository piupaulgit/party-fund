import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class EventService {
  events$: AngularFireList<any>;
  eventRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.events$ = this.db.list("/events");
  }

  // Add Event
  addEvent(event) {
    return new Promise<any>((resolve, reject) => {
      this.events$
        .push({
          eventName: event.eventName,
          eventDescription: event.eventDescription,
          eventType: event.eventType,
          amount: event.amount,
          startDate: event.startDate,
          adminMobileNumber: event.adminMobileNumber
        })
        .then(
          res => res,
          err => reject(err)
        );
    });
  }

  // Get all events
  public getAllEvents(): Observable<any> {
    return this.db
      .list("/events")
      .snapshotChanges()
      .pipe(
        map((products: any[]) =>
          products.map(prod => {
            const payload = prod.payload.val();
            const key = prod.key;
            return <any>{ key, ...payload };
          })
        )
      );
  }

  private errorHandelor(error) {
    console.log(error);
  }
}
