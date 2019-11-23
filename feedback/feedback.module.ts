import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeedbackPage } from './feedback.page';

//for star ratings gui
import { StarRatingModule } from 'ionic4-star-rating';

//form gui
import { ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: FeedbackPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    StarRatingModule, //import star rating module for feedback page
    ReactiveFormsModule
  ],
  declarations: [FeedbackPage]
})
export class FeedbackPageModule {}
