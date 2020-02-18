import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Profile } from '../interface/profile';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profiles$: AngularFireList<any>
  currentUserId: any;

  constructor( private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.profiles$ = this.db.list("/user");
   }
 
  // add user profile
  addProfile(profileDetails:Profile){
    this.afAuth.authState.subscribe(auth => {
      this.db.object(`user/${auth.uid}`).set(profileDetails)
    })
  }

  // get current User
  getCurrentUser(){
    this.afAuth.authState.subscribe(auth => {
      return this.currentUserId = auth.uid;
    })
  }

  getProfileDetail(currentUserId):Observable<any>{
    console.log(currentUserId)
    return this.db.object(`user/${currentUserId}`).valueChanges()
  }

}