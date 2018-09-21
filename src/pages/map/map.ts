import { MapProvider } from './../../providers/map/map';
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
export class MapPage {

  map: GoogleMap;
  markers:any;
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

  this.nearbyPlace(latitude,longitude)
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

  nearbyPlace(latitude,longitude){
    // this.loadMap();
    // console.log("nearbyPlace",location );

    this.mapProvider.getLocationAtm(latitude,longitude)
    this.markers = [];
    // let service = new google.maps.places.PlacesService(this.map);
    // service.nearbySearch({
    //           location: location,
    //           radius: this.isKM,
    //           types: [this.isType]
    //         }, (results, status) => {
    //             this.callback(results, status);
    //         });

  }

  callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        // this.createMarker(results[i]);

      }
    }
  }

  createMarker(place){
    var placeLoc = place;
    console.log('placeLoc',placeLoc)
    this.markers = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location
    });

    let infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(this.markers, 'click', () => {
      this.ngZone.run(() => {
        infowindow.setContent(place.name);
        infowindow.open(this.map, this.markers);
      });
    });
  }
}
