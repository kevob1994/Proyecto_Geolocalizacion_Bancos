import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition} from '@ionic-native/geolocation';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  }

  geolocationNative(){
    this.geolocation.getCurrentPosition().then(
      (position: Geoposition) => console.log("Mi posición",position),
      error =>console.log("ERROR",error)
    )
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}
