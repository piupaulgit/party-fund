import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProfileService } from '../service/profile.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // form prioperty
  profileForm: FormGroup;
  currentUserId: string;

  constructor( private profileService: ProfileService, private afAuth: AngularFireAuth) { 
      // create form group
      this.profileForm = new FormGroup({
        fullName: new FormControl(''),
        profileImage: new FormControl(''),
        mobile: new FormControl(''),
        upi: new FormControl('')
      })
   }

  ngOnInit() {
    this.afAuth.authState.subscribe(auth => {
      this.currentUserId = auth.uid;
      console.log(this.currentUserId)
      this.fetchProfileDetail(this.currentUserId)
    })

    
    
  }

  addProfile(){
    this.profileService.addProfile(this.profileForm.value)
  }

  fetchProfileDetail(userId){
    this.profileService.getProfileDetail(userId).subscribe(data => {
      console.log(data)
    })
  }
}
