import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapProvider {

  constructor(private http: HttpClient) {
    console.log('Hello MapProvider Provider');
  }
  getLocationAtm(latitude,longitude){
    console.log(latitude,longitude)
    // let url= `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=700&type=atm&keyword=cruise&key=AIzaSyAfLbbgvyDcAZCQTwvrAzRPiSuPnQeCPjw`
    // https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&location=42.3675294,-71.186966&radius=10000&key=AIzaSyAfLbbgvyDcAZCQTwvrAzRPiSuPnQeCPjw
    // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&rankby=distance&type=food&key=AIzaSyAfLbbgvyDcAZCQTwvrAzRPiSuPnQeCPjw
    let url= "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyDq1F7PxLhxbjTnTHyyY61z5N2NIgpqstc"
    this.http.get(url).subscribe(
      (response: any) => {
        // callback.onRetrived(response)
        console.log("RESPUETA")
        console.log(response)
      },
        (error: any) => {
          if (error) {
            console.log(error);

            // callback.onError(-33)
          }
        }
      )
  }
}

export interface MapHelper {
  onRetrived (response: any)
  onError (rc: number)
}
