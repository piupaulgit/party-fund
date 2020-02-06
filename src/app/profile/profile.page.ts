import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // form prioperty
  profileForm: FormGroup;

  constructor() { 
      // crete form group
      this.profileForm = new FormGroup({
        fullName: new FormControl(''),
        mobile: new FormControl(''),
        upi: new FormControl('')
      })
   }

  ngOnInit() {
  }

  addProfile(){
    console.log(this.profileForm.value)
  }

}
