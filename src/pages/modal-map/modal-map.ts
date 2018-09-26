import { Component,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,Events } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Polyline,
  HtmlInfoWindow
} from '@ionic-native/google-maps';
/**
 * Generated class for the ModalMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-map',
  templateUrl: 'modal-map.html',
})
export class ModalMapPage {
  coordenadas: any;
  coorInit: any;
  coorEnd: any;
  titleAtm: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public _ngZone: NgZone, public events: Events) {
  }
  map: GoogleMap;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalMapPage');
    //
    this.coordenadas = this.navParams.get('coordenadas')
    this.coorInit = this.navParams.get('coorInit')
    this.coorEnd = this.navParams.get('coorEnd')
    this.titleAtm = this.navParams.get('titleAtm')
    console.log(this.coordenadas,this.coorInit,this.coorEnd)

  }
  ionViewDidEnter(){
    this.loadMap(this.coordenadas,this.coorInit,this.coorEnd,this.titleAtm)
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
loadMap(coorPolylines,coorInit,coorEnd,titleAtm){
   let latitude = coorInit.lat;
   let longitude = coorInit.lng;
   console.log(coorInit.lat,coorInit.lng)
//   this.myLatitudeStart = position.coords.latitude;
//   this.myLongitudeStart = position.coords.longitude;
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

  this.map = GoogleMaps.create('map_canvas2', mapOptions);
   console.log(this.map)
    let marker: Marker = this.map.addMarkerSync({
      title: 'My Position',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQISURBVFiFtZdbaBxlFMd/Z2d2kjRNSNY0VxNJE0ksWC3EvITGGgUFK/ZB+6AWKeJDRXzSotDQVtoqWLEisVDRakCpGOs1bfGCxgffLCIabW1rkzWb3VzNfW8zx4fd1nTZbWfW9INh4Hzn+5/fdz8fqorXDygCXi0s8I9bfnMSeB0ozksrn0Z+v9G7YV3jwsm3uvWbo3u0fX3zgmUaH+WjJekeuS4iUiIiM798cUjWNd0IwPnhMC33Pa2qWqmqE170fJ6ip0q5afjs+uobLhtqKwNYfjMBBLyKeQZQ1WERgm/09uulYXzzg5Oo44wD57zq5bUGgHbLb05UVZTN1VUF5iy/OQ10XPc1ICI+oBSwAQE6AQMYSNsMYFZVnRUfAeBBH5wBFNBbiotON5YUtAANPjh2yV4gEgQeWtFtCGy2REK9tzYt/tPVprNdd2j32jq1fOKYIvGnGqoiM11tOtPVpkdaGxcCpjnvFsLVFIhI3zMN1ZUHbq7fuNweisWxFeoLreVm5+Xf/5ZDkbGBuWTyrmtpu90FHY9WV9RlGmsLrMzgAL7O8hKJOU67G2G3AIIgo7EEr1wczen02tAowWj8vzYrCADAucUoxyNTOes/H5vmj4UlL5J5nYQrWkyvDWyUmaSNAKWmAcBs0kZJHQTXHWBwfom6gdMA7N38AKZhsOuzT/F2pXkHGDk1OVO5kLSpqVjDvTt2AvBXuvLx9R0EZien33v3cOnH4alIs2nVmiJjKwmw/8CFkaNxx9GSQMU8UAIwFQ7hODYVtfVMWkVDCUdb3w9P1PhF5uOqz68YgKoeF5EvgU2gfQDBs4N819cbBezOLY8U1zW1xJNKXGFrXPUrVY250Xa9C1Q1Dlze5ME/B+OObe93bHvP8JnfostcE26DewLIAgSQBJKKx7QqHwAREaDZhWtz+tr+/wAiYohIl4j0ACPASy40dwMhETksIveIyFXXWU4AEdkGhIAXgSHgbuBhFwDbSCUq54HuNMwTuZyz0onIs8Be4DFV/WSZvcoFAKp6FjgIHBSR+4FjIlKjqvsyfa8YARHxicj2dPDdy4PnW1S1H3gB2CUiT4qIkRMAWA1sIvXyKcuiNx5bWhTHtpkOhxwgAkSmwyN2dHExmkjEDGAyS7tywALuJJVTXkGYLQV7B+gHSjPrDNM8YVpWzLQKgmnI1Ybff8FnGFGfaf6URWsVcArocZ0TAsXAESAMPAfcDviW1a8ltX4MwJ/+35ahsQbYCYwCb5Pj7XjVnFBEOoEdwBZgCfgB+B74FZgFtgKFwIdAJVAFtKan8Sbga2Cfqv6cM4bLpLQM2AhsSH/1pOayJt37IVLnRAi4CHwL/KiqiWtqe32cZoBtB1apak++Gv8CQAE20ynPG5UAAAAASUVORK5CYII=',
      animation: 'DROP',
      position: {
       lat: latitude,
        lng: longitude
      }
    });
     this.map.addMarker({
      title: 'IR',
       icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA3QAAAN0BcFOiBwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIJSURBVFiF7ZU9SBthGMd/d9GUQikiXcSkBClYRxdxiFIqoYXilqWdChYKXaWTHetUnISC2ODH0KVuQWwJKYVmaAOlSxeXKCYhVDIEB4NfeTu8d9dLuPcu8eLp4B8O3nve5/j/3ud57k4TQgCQePYyrmmNBWCMi1VeCH0283EpB6Cb0YDMAcYMLwB67BsAm6vvL9T9yfNXlhfYKnBZ6vFKmP9xCsDcuEyd+XxCrtRoyolHdFKPewF48/2Ug2PBuwfy/vW3E26HNd5OOFu5AhRqgvU/ZwA8vR9iqE/z4uXTtsyP3JLgX3Yk7LkAflYaTeuhvpB10uEPRwBsv7jh+OyKAe4l1xnI2wDs63bUEPLyCSAc1+1oMqozGfWecWULCjVBtS64c1P2vVoXFGqirTkAWH7U3CqVlIhm/6t1CWKPdVNKAKeedzoHvgB+/ZWn3kqG2UqGm2LdlHIGRvo1Rvo1q+fJ4RD7h/8B4hFn9ta4Ks8TYMkYIlPzLR8S83vQqta4Ks/U1fsXGH+rwHTpFbgGUL4FsbsRphNTRAcHfBkUyxXSmSy7eyXHfWUFumEOEB0cYDoxpdxXVsA0H/264Qvg98Ok60Gu7gwUyxVZvtg93ybFckW5p6xAOpN1fbAT83Qm2znA7l6JxdSab4DF1JryDXAFCErXAHaAfIC+lpcFIIQ+GxBE3vAC4B87hq5nUNo6JgAAAABJRU5ErkJggg==',
       animation: 'DR',
       position: {
         lat: coorPolylines[coorPolylines.length-1].lat,
         lng: coorPolylines[coorPolylines.length-1].lng
       }
     }).then((marker: Marker)=> {

      marker.addEventListener(GoogleMapsEvent.INFO_CLICK).subscribe(
        ()=>{
          this.viewCtrl.dismiss({
            lat: this.coordenadas[this.coordenadas.length-1].lat,
            lng: this.coordenadas[this.coordenadas.length-1].lng
          });
         },
         error => console.log(error)
      )
     })

     this.map.addPolyline({
             points:coorPolylines,
             color: "#3E9AFB",
             width: 10,
             geodesic:true,
             clickable: true,

     })
  }

}
