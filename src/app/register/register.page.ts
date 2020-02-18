import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  emailAddress: string = "";
  password: string = "";
  mobileNumber: number;
  confirmPassword = "";

  constructor(private afAuth: AngularFireAuth, private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
  }

  // register
  async register(){
    const {emailAddress, mobileNumber, password, confirmPassword} = this;
    if(password !== confirmPassword){
      return console.log('password does not match');
    }
    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(emailAddress, password);
      this.router.navigateByUrl('/login')
    }
    catch(err){
      console.dir(err);
      this.sharedService.showToaster(err.message, "danger")
    }
  }
  // ===========================

}
