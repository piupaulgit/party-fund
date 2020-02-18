import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  emailAddress : string = "";
  password : string = "";
  constructor( private afAuth : AngularFireAuth, private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
  }
  
  // login
  async login(){
    const {emailAddress , password} = this
    try{
      await this.afAuth.auth.signInWithEmailAndPassword(emailAddress, password)
      this.router.navigateByUrl('/profile');
    }
    catch(err){
      console.dir(err)
      this.sharedService.showToaster(err.message, "danger")
    }
  }
  // ===========================

}
