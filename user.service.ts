import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'


import { AngularFirestore } from '@angular/fire/firestore';

interface user {
  //fname: string,
  //lname: string,
  //gender: string,
  email: string,
  //password: string,
  //mobile: number,
  //age: number,
  //commute: string,
  uid: string
}

interface star {
  routeID: string
  value: number
}


@Injectable()
export class UserReg {
  private user: user
  private star: star


  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {

  }

  setUser(user: user) {
    this.user = user
  }

  getUID() {
    if(!this.user) {
      if(this.afAuth.auth.currentUser) {
        const user = this.afAuth.auth.currentUser
        this.setUser({
          email: user.email,
          uid: user.uid
        })
        return user.uid
      } else {
        throw new Error("User not logged in")
      }

    } else {
      return this.user.uid
    }
  }

  setStar(rating){
    return this.firestore.collection('star').add(rating);
  }

}
