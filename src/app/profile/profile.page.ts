import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProfileService } from '../service/profile.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // form prioperty
  profileForm: FormGroup;

  constructor( private profileService: ProfileService) { 
      // crete form group
      this.profileForm = new FormGroup({
        fullName: new FormControl(''),
        profileImage: new FormControl(''),
        mobile: new FormControl(''),
        upi: new FormControl('')
      })
   }

  ngOnInit() {
    
  }

  addProfile(){
    this.profileService.addProfile(this.profileForm.value)
  }

}
