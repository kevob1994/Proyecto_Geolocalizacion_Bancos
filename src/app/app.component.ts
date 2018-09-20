import { HomePage } from './../pages/home/home';
import { Component } from '@angular/core';
import { Platform, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, config:Config) {
    platform.ready().then(() => {
      if (platform.is('android')) {
        config.set('backButtonIcon', 'ios-arrow-back-outline');
      } else {
        config.set('backButtonIcon', 'ios-arrow-back-outline');
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
