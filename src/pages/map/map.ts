import { Atm } from './../../model/atm.model';
import { MapProvider, MapHelper } from './../../providers/map/map';
import { Component,  NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions, Modal } from 'ionic-angular';
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
export class MapPage implements MapHelper {

  map: GoogleMap;
  markers:any;
  isKM:any=500;
  isType:any="atm";
  myLatitudeStart:any;
  myLongitudeStart:any;
  myLatitudeEnd:any;
  myLongitudeEnd:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation, private ngZone: NgZone,
    private mapProvider: MapProvider,public modalCtrl: ModalController ) {
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

  this.myLatitudeStart = position.coords.latitude;
  this.myLongitudeStart = position.coords.longitude;
  let mapOptions: GoogleMapOptions = {
    camera: {
      target: {
        lat: latitude,
        lng: longitude
      },
      zoom: 16,
      tilt: 30
    }
  };

  this.map = GoogleMaps.create('map_canvas', mapOptions);

  let marker: Marker = this.map.addMarkerSync({
    title: 'My Position',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQISURBVFiFtZdbaBxlFMd/Z2d2kjRNSNY0VxNJE0ksWC3EvITGGgUFK/ZB+6AWKeJDRXzSotDQVtoqWLEisVDRakCpGOs1bfGCxgffLCIabW1rkzWb3VzNfW8zx4fd1nTZbWfW9INh4Hzn+5/fdz8fqorXDygCXi0s8I9bfnMSeB0ozksrn0Z+v9G7YV3jwsm3uvWbo3u0fX3zgmUaH+WjJekeuS4iUiIiM798cUjWNd0IwPnhMC33Pa2qWqmqE170fJ6ip0q5afjs+uobLhtqKwNYfjMBBLyKeQZQ1WERgm/09uulYXzzg5Oo44wD57zq5bUGgHbLb05UVZTN1VUF5iy/OQ10XPc1ICI+oBSwAQE6AQMYSNsMYFZVnRUfAeBBH5wBFNBbiotON5YUtAANPjh2yV4gEgQeWtFtCGy2REK9tzYt/tPVprNdd2j32jq1fOKYIvGnGqoiM11tOtPVpkdaGxcCpjnvFsLVFIhI3zMN1ZUHbq7fuNweisWxFeoLreVm5+Xf/5ZDkbGBuWTyrmtpu90FHY9WV9RlGmsLrMzgAL7O8hKJOU67G2G3AIIgo7EEr1wczen02tAowWj8vzYrCADAucUoxyNTOes/H5vmj4UlL5J5nYQrWkyvDWyUmaSNAKWmAcBs0kZJHQTXHWBwfom6gdMA7N38AKZhsOuzT/F2pXkHGDk1OVO5kLSpqVjDvTt2AvBXuvLx9R0EZien33v3cOnH4alIs2nVmiJjKwmw/8CFkaNxx9GSQMU8UAIwFQ7hODYVtfVMWkVDCUdb3w9P1PhF5uOqz68YgKoeF5EvgU2gfQDBs4N819cbBezOLY8U1zW1xJNKXGFrXPUrVY250Xa9C1Q1Dlze5ME/B+OObe93bHvP8JnfostcE26DewLIAgSQBJKKx7QqHwAREaDZhWtz+tr+/wAiYohIl4j0ACPASy40dwMhETksIveIyFXXWU4AEdkGhIAXgSHgbuBhFwDbSCUq54HuNMwTuZyz0onIs8Be4DFV/WSZvcoFAKp6FjgIHBSR+4FjIlKjqvsyfa8YARHxicj2dPDdy4PnW1S1H3gB2CUiT4qIkRMAWA1sIvXyKcuiNx5bWhTHtpkOhxwgAkSmwyN2dHExmkjEDGAyS7tywALuJJVTXkGYLQV7B+gHSjPrDNM8YVpWzLQKgmnI1Ybff8FnGFGfaf6URWsVcArocZ0TAsXAESAMPAfcDviW1a8ltX4MwJ/+35ahsQbYCYwCb5Pj7XjVnFBEOoEdwBZgCfgB+B74FZgFtgKFwIdAJVAFtKan8Sbga2Cfqv6cM4bLpLQM2AhsSH/1pOayJt37IVLnRAi4CHwL/KiqiWtqe32cZoBtB1apak++Gv8CQAE20ynPG5UAAAAASUVORK5CYII=',
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
  // this.nearbyPlace(latitude,longitude)
  }

  getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'My Position',
        icon: '',
        animation: 'BOUNCE',
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

    this.mapProvider.getLocationAtm(latitude,longitude,this)
    this.markers = [];


  }

  onRetrived (response: Array<Atm>){
    console.log("onRetrived response")
    console.log(response)
    this.createMarkerAtm(response)
  }
  createMarkerAtm(arrayAtm: Array<Atm>) {

    for (var i = 0; i < arrayAtm.length; i++) {
      this.createMarker(arrayAtm[i]);
      // console.log("createMarkerAtm",arrayAtm[i])
    }
}
createMarker(atm: Atm){
  // var placeLoc = place;
  // console.log('placeLoc',placeLoc)
  var markers = this.map.addMarker({
    title: atm.name,
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA3QAAAN0BcFOiBwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIJSURBVFiF7ZU9SBthGMd/d9GUQikiXcSkBClYRxdxiFIqoYXilqWdChYKXaWTHetUnISC2ODH0KVuQWwJKYVmaAOlSxeXKCYhVDIEB4NfeTu8d9dLuPcu8eLp4B8O3nve5/j/3ud57k4TQgCQePYyrmmNBWCMi1VeCH0283EpB6Cb0YDMAcYMLwB67BsAm6vvL9T9yfNXlhfYKnBZ6vFKmP9xCsDcuEyd+XxCrtRoyolHdFKPewF48/2Ug2PBuwfy/vW3E26HNd5OOFu5AhRqgvU/ZwA8vR9iqE/z4uXTtsyP3JLgX3Yk7LkAflYaTeuhvpB10uEPRwBsv7jh+OyKAe4l1xnI2wDs63bUEPLyCSAc1+1oMqozGfWecWULCjVBtS64c1P2vVoXFGqirTkAWH7U3CqVlIhm/6t1CWKPdVNKAKeedzoHvgB+/ZWn3kqG2UqGm2LdlHIGRvo1Rvo1q+fJ4RD7h/8B4hFn9ta4Ks8TYMkYIlPzLR8S83vQqta4Ks/U1fsXGH+rwHTpFbgGUL4FsbsRphNTRAcHfBkUyxXSmSy7eyXHfWUFumEOEB0cYDoxpdxXVsA0H/264Qvg98Ok60Gu7gwUyxVZvtg93ybFckW5p6xAOpN1fbAT83Qm2znA7l6JxdSab4DF1JryDXAFCErXAHaAfIC+lpcFIIQ+GxBE3vAC4B87hq5nUNo6JgAAAABJRU5ErkJggg==",
    animation: 'BOUNCE',
    position: {
      lat: atm.latitude,
      lng: atm.longitude
    },
    label: 'A'
  }).then((marker: Marker) => {
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe((data: any) => {
        // console.log(data[1]._objectInstance.symbol);
        // console.log();
         this.myLatitudeStart;
         this.myLongitudeStart;
          this.myLatitudeEnd = data[0].lat
          this.myLongitudeEnd = data[0].lng

        this.mapProvider.getRouteAtm(this.myLatitudeStart,this.myLongitudeStart,this.myLatitudeEnd,this.myLongitudeEnd).subscribe(
           (response: any) => {
             this
             var arrarCoordenadas: Array<any> = [];
             var obj = {
              lat: this.myLatitudeStart,
              lng: this.myLongitudeStart
             }
             arrarCoordenadas.push(obj)
            //  console.log("this.mapProvider.getRouteAtm");
            //  console.log(response.route.legs[0].maneuvers);
             for(let i=0;i<response.route.legs[0].maneuvers.length; i++){
              obj = {
                lat: response.route.legs[0].maneuvers[i].startPoint.lat,
                lng: response.route.legs[0].maneuvers[i].startPoint.lng
               }
              arrarCoordenadas.push(obj)
             }
             obj = {
              lat: this.myLatitudeEnd,
              lng: this.myLongitudeEnd
             }
            arrarCoordenadas.push(obj)

            //  console.log("arrarCoordenadas",arrarCoordenadas)
          //     this.map.addPolyline({
          //    points:arrarCoordenadas,
          //    color: "#3E9AFB",
          //    width: 10,
          //    geodesic:true,
          //    clickable: true
          //  })
           const myModalMap: Modal = this.modalCtrl.create('ModalMapPage',
           {
              coordenadas: arrarCoordenadas,
              coorInit: {
              lat: this.myLatitudeStart,
              lng: this.myLongitudeStart
              },
              coorEnd: {
                lat: this.myLatitudeEnd,
                lng: this.myLongitudeStart
                },
              titleAtm: marker.getTitle()
           });
          myModalMap.present();

           },
             (error: any) => {
               if (error) {
               }
             }
           )

      });
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
