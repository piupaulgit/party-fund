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
  addEvent(eventDetail) {
    return new Promise<any>((resolve, reject) => {
      this.events$.push(eventDetail).then(
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

  // Get single item
  public getSingleEvent(id): Observable<any> {
    return this.db.object("events/" + id).valueChanges();
  }

  // update event
  public updateEvent(key, data): Promise<void> {
    // return this.db.object('/events/' + key).update(data)
    return this.db.list("events").update(key, data);
  }

  // delete event
  public deleteEvent(key): Promise<void> {
    return this.db.object("/events/" + key).remove();
  }

  private errorHandelor(error) {
    console.log(error);
  }
}
