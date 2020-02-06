import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  emailAddress : string = "";
  password : string = "";
  constructor( private afAuth : AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }
  
  async login(){
    console.log(this)
    const {emailAddress , password} = this
    try{
      const res = await this.afAuth.auth.signInWithEmailAndPassword(emailAddress, password)
      this.router.navigateByUrl('/home');
    }
    catch(err){
      console.dir(err)
    }
  }

}
