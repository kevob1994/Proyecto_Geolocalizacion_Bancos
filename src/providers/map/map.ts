import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Atm} from './../../model/atm.model';
/*
  Generated class for the MapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapProvider {
  arrayAtm: Array<Atm> = [];
  constructor(private http: HttpClient) {
    console.log('Hello MapProvider Provider');
  }

  getLocationAtm(latitude,longitude,callback){
    console.log(latitude,longitude)
    //let url= `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=atm&key=AIzaSyBlSJra2EH7VOfiT1rpA1ECoKigazcIePY`
    let url= `https://places.cit.api.here.com/places/v1/autosuggest%20?at=${latitude}%2C${longitude}&q=atm&app_id=qF3TnCulPPxeq0JoegTf&app_code=uCK3CcErwfJKi9oAx26-6A`
    this.http.get(url).subscribe(
      (response: any) => {
        for(let i=0; i<response.results.length; i++){
          if(response.results[i].position != undefined ){
            let obj: Atm = {
              name: "",
              latitude: 0,
              longitude: 0
            };
            obj.name = response.results[i].title;
            obj.latitude = response.results[i].position[0];
            obj.longitude = response.results[i].position[1];
            this.arrayAtm.push(obj);
          }
        }
        // console.log("Array<Atm>",this.arrayAtm)
        callback.onRetrived(this.arrayAtm)
      },
        (error: any) => {
          if (error) {
            console.log(error);

            callback.onError(-33)
          }
        }
      )
  }
}

export interface MapHelper {
  onRetrived (response: any)
  onError (rc: number)
}
