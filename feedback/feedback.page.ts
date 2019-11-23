import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserReg } from '../../user.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  customForm: FormGroup;

    constructor( private formBuilder: FormBuilder, public afAuth: AngularFireAuth ,
      private alertController: AlertController,
      private router : Router,
      public afs: AngularFirestore,
      private starService: UserReg,
    ) {
        // do your stuff
    }

    safety: number
    speed: number
    enjoyment: number
    comment: string

    ngOnInit() {

        this.customForm = this.formBuilder.group({
            // set default initial value
            starRating: [3],
            starRating2: [3],
            starRating3: [3]
        });

    }

    submitRating() {
    /*  this.afAuth.auth.onAuthStateChanged(user => {
        if (user) {
          this.currentUser = user;
          this.afs.doc(`star/${user.uid}`).set({
            safety,
            speed,
            enjoyment
          });
        }
      });
      */

      let record = {};
      record['speed'] = this.speed;
      record['safety'] = this.safety;
      record['enjoyment'] = this.enjoyment;
      record['comment'] = this.comment;
      this.starService.setStar(record).then(resp => {
        this.speed
        this.safety
        this.enjoyment
        this.comment
        console.log(resp);
        this.feedbackAlert();
        this.goHomePage();
      })
        .catch(error => {
          console.log(error);
        });
    }

    async feedbackAlert(){
      const alert = await this.alertController.create({
        message: "Feedback successfully submitted, thank you!",
        buttons: ["OK"]
      })
      await alert.present();
    }

    goHomePage(){
      this.router.navigate(['home/navigate'])
    }


    //safety
    logRatingChange(rating){
        console.log("changed safety: ",rating);
        // do your stuff
    }

    //speed
    logRatingChange2(rating){
        console.log("changed speed: ",rating);
        // do your stuff
    }

    //enjoyment
    logRatingChange3(rating){
        console.log("changed enjoyment: ",rating);
        // do your stuff
    }

  }
