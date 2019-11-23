import { Component, OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
declare var isDisabled

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  phoneno: string = "";
  emailadd: string = "";
  commutem: string = "";
  isDisabled: boolean = true;
  editprofile: boolean = false;
  emailcorrectformat: boolean = false;
  phonenocorrectformat: boolean = false;
  changed: boolean = false;
  messagealert: string = "";

  constructor(public alertController: AlertController) {

  }

  ngOnInit(){

  }

  async presentAlert(status) {
   const alert = await this.alertController.create({
     header: 'Error',
     message: this.messagealert,
     buttons: ['OK']
   });
   await alert.present();
 }

  validateProfile(emaildomain)
  {

    if(emaildomain != "gmail.com")
    {
      this.messagealert = "Invaild email address format";
      this.emailcorrectformat = false;
      this.presentAlert(status);
    }
    else if(emaildomain != "outlook.com")
    {
      this.messagealert = "Invaild email address format";
      this.emailcorrectformat = false;
      this.presentAlert(status);
    }
    else if(emaildomain != "hotmail.com")
    {
      this.messagealert = "Invaild email address format";
      this.emailcorrectformat = false;
      this.presentAlert(status);
    }
    else
    {
       this.emailcorrectformat = true;
    }

    if(this.phoneno.length != 8)
    {
      this.messagealert = "Invaild phone number length";
      this.phonenocorrectformat = false;
      this.presentAlert(status);
    }
    else
    {
      this.phonenocorrectformat = true;
    }

    if(this.emailcorrectformat == true && this.phonenocorrectformat == true )
    {
        return true;
    }else{
       return false;
    }

  }

  editProfile()
  {
    this.phoneno = "98765432";
    this.emailadd = "user1@gmail.com";

    let emails = this.emailadd.split("@");
    let emaildomain = emails[(emails.length -1)];

    this.changed = validateProfile(emaildomain)

        if(this.changed == false)
        {
            this.isDisabled = false;
        }else{
            this.isDisabled = true;
        }
     }
  }
