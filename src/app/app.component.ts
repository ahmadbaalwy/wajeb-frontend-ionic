import firebase from 'firebase/app';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginPage } from './login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();

    var firebaseConfig = {
      apiKey: "AIzaSyAuBCrXjmHH0qwzVZF08RIGswQYPQzJGRg",
      authDomain: "wajeb-project.firebaseapp.com",
      projectId: "wajeb-project",
      storageBucket: "wajeb-project.appspot.com",
      messagingSenderId: "838923708654",
      appId: "1:838923708654:web:2f6a1d17569f08cfdc2bff",
      measurementId: "G-TFW0X8L0KG"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
          console.log('hello');
        }, false);
      });
    });
  }
}
