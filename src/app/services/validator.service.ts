import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.model';
import { HttpClient } from '@angular/common/http';
import 'firebase/analytics';



@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  loggedIn: boolean;
  client = null;
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    public fireAuth: AngularFireAuth
  ) {
    this.fireAuth.authState.subscribe((client) => {
      this.client = client ? client : null;
    });
  }

  async signup() {
    firebase.analytics();
    try {
      const user = await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      console.log(await user.user.email);
      this.client = user.user;
      const data: User = {
        username: user.user.displayName,
        email: user.user.email
      };
      this.createUser(data);
    }
    catch (err) {
      console.log('fetch failed', err);
    }
    console.log('User is:', this.client.email);
  }

  displayinfo(){
    console.log(this.client.email);
  }

  async login(){ //Login
    firebase.analytics();
    try {
      const user = await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      console.log(await user.user.email);
      this.client = user.user;
      const data: User = {
        username: user.user.displayName,
        email: user.user.email
      };
      const loggedUser = await this.resumeUser(data);
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }

  logout() { //Logout
    firebase.analytics();
    this.fireAuth.signOut();
    this.loggedIn = false;
    this.client = null;
    console.log('Logged out');
  }

  createUser(userdata: User){ //Adding user to DB
    const url = this.baseUrl + '/users/signup';
    this.http.post<{user: User[]}>(url , userdata)
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

  resumeUser(userdata: User){ //Checking user in DB
    const url = this.baseUrl + '/users/login';
    this.http.post<{user: User[]}>(url , userdata)
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

}
