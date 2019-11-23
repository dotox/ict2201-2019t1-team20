import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { UserReg } from '../../user.service';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {

 constructor(
   public afAuth: AngularFireAuth,
   public alertController: AlertController,
   public router: Router,
   public user: UserReg,
 ) {}

 ngOnInit() {
 }

 email: string

 async wrongEmail() {
   const alert = await this.alertController.create({
       header: "Wrong email",
       message: "Email not registered, please enter the correct email.",
       buttons: ['OK']
     });

     await alert.present();
   }

   async successAlert() {
     const alert = await this.alertController.create({
       header: "Email sent",
       message: "Please follow the instructions sent to your email to proceed with resetting your password.",
       buttons: ['OK']
     });

     await alert.present()
   }

 resetpw(){

    this.afAuth.auth.sendPasswordResetEmail(this.email).then(data => {
      console.log(data)
      console.log("success")
      this.successAlert()
      this.router.navigate(['../login']);
    }) .catch(err =>{
      console.log("fail");
      this.wrongEmail();
    });
  }

}
