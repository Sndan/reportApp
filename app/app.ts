import {Component, ViewChild} from '@angular/core';
import {App, ionicBootstrap, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {GettingStartedPage} from './pages/getting-started/getting-started';
import {ReportsViewPage} from './pages/reports-view/reports-view';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = GettingStartedPage;
  pages: Array<{title: string, component: any}>

  constructor(private platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Getting Started', component: GettingStartedPage },
      { title: 'List', component: ReportsViewPage }
    ];

  }

  initializeApp() {
    const config = {
      apiKey: "AIzaSyB8PNa5IQhC61f3SHXORRq53lCTtDdAJcw",
      authDomain: "reportapp-59917.firebaseapp.com",
      databaseURL: "https://reportapp-59917.firebaseio.com",
      storageBucket: "reportapp-59917.appspot.com",
    };
    firebase.initializeApp(config);
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
