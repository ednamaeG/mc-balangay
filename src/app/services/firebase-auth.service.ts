import { resolve } from '@angular-devkit/core';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { Plugins, registerWebPlugin } from '@capacitor/core';
import { FacebookLogin } from '@capacitor-community/facebook-login';
const { Storage } = Plugins;

registerWebPlugin(FacebookLogin);
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  userInfo = null;

  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userDetails$: BehaviorSubject<any> = new BehaviorSubject(null);
  isAuthenticated: boolean = false;

  constructor(private fireAuth: AngularFireAuth, private afd: AngularFireDatabase) { }

  // setLoginTrue() {
  //   this.isAuthenticated = !!true;
  //   this.isAuthenticated$.next(true);
  // }

  async onGoogleLoginSuccess(accessToken, accessSecret) {
    const _self = this;
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((success) => {

        // this.isGoogleLogin = true;
        this.userInfo = success.user;
        this.userInfo.authentication_method = "Google"

        _self.isAuthenticated$.next(true);

        // _self.userDetails$.next(this.userInfo)
        _self.isAuthenticated = true;

        // this.loading.dismiss();
        this.checkUserDetails(this.userInfo.uid)
      });
  }

  onFbLoginSuccess(userDetails) {
    console.log("user:::", userDetails)
    this.userInfo = {
      uid: userDetails.id,
      displayName: userDetails.name,
      email: userDetails.email,
      photoURL: userDetails.picture.data.url,
      authentication_method: 'Facebook',
      phoneNumber: null
    };

    this.checkUserDetails(userDetails.id);
    this.isAuthenticated$.next(true);
  }

  async _loginWithEmail(email, password) {
    console.log(email, password)
    const self = this;
    this.fireAuth.signInWithEmailAndPassword(email, password).then((success) => {
      self.userInfo = success.user;
      self.isAuthenticated$.next(true);
      this.checkUserDetails(this.userInfo.uid)

    }).catch((err) => {
      console.log("ERR", err)
      self.isAuthenticated$.next(false);

    })
  }

  async loginWithEmail(email, password) {
    return new Promise((resolve, reject) => {
      const self = this;
      this.fireAuth.signInWithEmailAndPassword(email, password).then((success) => {
        self.userInfo = success.user;
        self.userInfo.authentication_method = "email"
        self.isAuthenticated$.next(true);
        this.checkUserDetails(this.userInfo.uid)
        resolve(true)

      }).catch((err) => {
        console.log("ERR", err)
        reject(false)
      })
    })

  }


  async registerUser(user) {
    // const { displayName, phoneNumber, email, photoURL, uid, authentication_method } = this.userInfo;
    // const user = {
    //   name: displayName,
    //   phoneNumber: phoneNumber,
    //   email: email,
    //   id: uid,
    //   photoURL: photoURL,
    //   authentication_method: authentication_method
    // }


    const ref = this.afd.database.ref("users/").child(user.id).set(user);
    ref.then((res) => {
      console.log(user, 'REgister')
      this.userDetails$.next(user)
    }).catch((err) => {
      console.log("error", err)
    })
  }

  checkUserDetails(id) {
    const ref = this.afd.database.ref("users/").child(id);
    const self = this;
    const { displayName, phoneNumber, email, photoURL, uid, authentication_method } = this.userInfo;
    const user = {
      name: displayName,
      phoneNumber: phoneNumber,
      email: email,
      id: uid,
      photoURL: photoURL,
      authentication_method: authentication_method
    }


    ref.once("value", function (snapshot) {
      // this.userDetails$.next(snapshot.val())
      if (snapshot.val()) {
        ref.set(user)
        self.userDetails$.next(snapshot.val())
        self.saveLoginInfo()
      } else {
        self.registerUser(user)
      }

    });

  }

  getAuth() {
    var isLoggedIn = false;
    this.isAuthenticated$.subscribe((val) => {
      isLoggedIn = val
    })
    return isLoggedIn;
  }

  signUp(details) {
    const { email, password, name } = details;
    return new Promise((resolve, reject) => {
      const self = this;
      this.fireAuth.createUserWithEmailAndPassword(email, password).then((success) => {
        const user = {
          displayName: name,
          email: success.user.email,
          uid: success.user.uid,
          phoneNumber: success.user.phoneNumber,
          photoURL: success.user.photoURL,
          authentication_method: "email"
        }
        self.userInfo = user;
        // self.userInfo.displayName = name;

        self.isAuthenticated$.next(true);
        this.checkUserDetails(this.userInfo.uid)
        resolve(true)

      }).catch((err) => {
        console.log("ERR", err)
        reject(false)
      })

    })

  }

  async logout() {
    try {
      console.log("auth", this.userInfo.authentication_method)

      if (this.userInfo.authentication_method.toLowerCase() == "facebook") {
        await Plugins.FacebookLogin.logout()
      } else {
        // await this.fireAuth.signOut()
      }


    } catch (err) {

    }

    this.removeLoginInfo()

  }

  async getLoginInfo() {
    try {
      const res = await Storage.get({ key: 'login_info' });

      return JSON.parse(res.value);
    } catch (err) {
      console.log(err)
    }
  }

  async saveLoginInfo() {
    const loginInfo = {
      user: this.userInfo,
      isAuthenticated: true
    }
    try {
      const info = await Storage.set({
        key: 'login_info',
        value: JSON.stringify(loginInfo)
      });
      console.log(info)

    } catch (err) {
      console.log(err)
    }
  }

  async removeLoginInfo() {
    try {
       const res = await Storage.remove({ key: 'login_info' })
       console.log("removed",res)
    } catch (err) {
      console.log(err)
    }
  }
}
