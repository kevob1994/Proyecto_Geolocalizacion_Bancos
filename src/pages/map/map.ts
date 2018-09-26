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
  marker: Marker
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

  this.marker = this.map.addMarkerSync({
    title: 'My Position',
    icon: 'red',
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
          myModalMap.onDidDismiss( data => {

            console.log("Data del modal:");
            console.log( data.lat  );
            console.log( data.lng  );
            this.myLatitudeStart = data.lat;
            this.myLongitudeStart = data.lng;
            this.marker.setPosition({ lat:data.lat, lng: data.lng})
         })
           },
             (error: any) => {
               if (error) {
               }
             }
           )

      });
  });

}
  onError (rc: number){}
}
