import { MapProvider, MapHelper } from './../../providers/map/map';
import { Component,  NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition} from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import {Atm} from './../../model/atm.model';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage implements MapHelper{

  map: GoogleMap;
  markers:any = [];
  isKM:any=500;
  isType:any="atm";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation, private ngZone: NgZone,
    private mapProvider: MapProvider ) {
  }

  geolocationNative(){
    this.geolocation.getCurrentPosition().then(
      (position: Geoposition) => {
        // console.log("Mi posición",position)
        this.loadMap(position);
      },
      error => {
        console.log("ERROR",error)
      }
    )
  }

  ionViewDidLoad() {
    this.geolocationNative()
    console.log('ionViewDidLoad MapPage');
  }

  loadMap(position: Geoposition){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let mapOptions: GoogleMapOptions = {
    camera: {
      target: {
        lat: latitude,
        lng: longitude
      },
      zoom: 18,
      tilt: 30
    }
  };

  this.map = GoogleMaps.create('map_canvas', mapOptions);

  let marker: Marker = this.map.addMarkerSync({
    title: 'Ionic',
    icon: 'blue',
    animation: 'DROP',
    position: {
      lat: latitude,
      lng: longitude
    }
  });
  // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
  //   alert('clicked');
  // });

  this.mapProvider.getLocationAtm(latitude,longitude, this)
  }

  getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'My Position',
        icon: 'blue',
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error =>{
      console.log(error);
    });
  }
  
  onRetrived (response: any){
    // console.log("onRetrived response")
    // console.log(response)
    this.createMarkerAtm(response)
  }

  createMarkerAtm(arrayAtm: Array<Atm>) {
    
      for (var i = 0; i < arrayAtm.length; i++) {
        this.createMarker(arrayAtm[i]);
        console.log("createMarkerAtm",arrayAtm[i])
      }
  }

  createMarker(atm: Atm){
    // var placeLoc = place;
    // console.log('placeLoc',placeLoc)
    this.map.addMarker({
      title: atm.name,
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: atm.latitude,
        lng: atm.longitude
      }
    });
    // this.markers = new google.maps.Marker({
    //     map: this.map,
    //     title: atm.name,
    //     position: {
    //       lat: atm.latitude,
    //       lng: atm.longitude
    //     }
    // });

    // let infowindow = new google.maps.InfoWindow();

    // google.maps.event.addListener(this.markers, 'click', () => {
    //   this.ngZone.run(() => {
    //     infowindow.setContent(atm.name);
    //     infowindow.open(this.map, this.markers);
    //   });
    // });
  }
  
  onError (rc: number){}
}
