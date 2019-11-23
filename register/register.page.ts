import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore'

import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

import { UserReg } from '../../user.service';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public RegForm: FormGroup;
  public submitAttempt: boolean = false;

  constructor(public afAuth: AngularFireAuth ,
    private alertController: AlertController,
    private router : Router,
    public afstore: AngularFirestore,
    public user: UserReg,
    public formBuilder: FormBuilder
  ) {
    this.RegForm = formBuilder.group({
      fname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),Validators.required])],
      cpassword: ['', Validators.compose([Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),Validators.required])],
      email: ['',Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),Validators.required])],
      mobile: [''],
      age: ['', this.isValid],
      gender: [''],
      commute: ['', Validators.required]
    });
   }



  password: string = ""
  cpassword: string = ""
  email: string = ""
  fname: string = ""
  lname: string = ""
  mobile: string = ""
  age: string = ""
  gender: string = ""
  commute: string = ""


  ngOnInit() {}


  async verifyDetails(){

    const { email, password, cpassword, fname, lname, mobile, age, gender, commute } = this


    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Email/Password not valid',
      message: 'Your Credentials are incorrect',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }]
    });

    const pwdalert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Password does not match',
      message: 'Please re-enter Password',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }]
    });

    const success = await this.alertController.create({
      header: 'Success',
      subHeader: 'Registration is Done!',
      message: 'Please proceed to login.',
      buttons: [{
        text: 'OK',
        role: 'cancel'
      }]
    });
    if (password !== cpassword) {
      await pwdalert.present()
      return console.error("password mismatch")
    }
    else
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)

      this.afstore.doc(`users/${res.user.uid}`).set({
        email,
        password,
        fname,
        lname,
        mobile,
        age,
        gender,
        commute
      })
      this.user.setUser({
        email,
        uid: res.user.uid
      })
      await success.present()
      this.router.navigate(['login']);
  }
  catch(err) {
    console.dir(err)
    await alert.present()
  }

  }
  //Age Validator
  public isValid(control: FormControl): any {

        if(isNaN(control.value)){
            return {
                "not a number": true
            };
        }

        if(control.value % 1 !== 0){
            return {
                "not a whole number": true
            };
        }

        if(control.value < 8){
            return {
                "too young": true
            };
        }

        if (control.value > 90){
            return {
                "not realistic": true
            };
        }

        return null;
    }
}
