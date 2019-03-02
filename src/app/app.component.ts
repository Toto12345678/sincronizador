import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDvciQ5MB9L03U1vZC7GP2EMFiH4NhBqp0",
  authDomain: "sincronizador-23017.firebaseapp.com",
  databaseURL: "https://sincronizador-23017.firebaseio.com",
  projectId: "sincronizador-23017",
  storageBucket: "sincronizador-23017.appspot.com",
  messagingSenderId: "371858758007"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
