import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { ICar } from '../interfaces/car.ts';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  private _http: HttpClient;
  private _siteURL!:'http://localhost:5050/cars/';


  constructor(private http: HttpClient) {
    this._http = http;
  }

  getCarDetails():Observable<any> {

    console.log("got here");
    return this._http.get<ICar>(this._siteURL)
    .pipe(
      tap(data => console.log('car data/error' + JSON.stringify(data))
    ),
    catchError(this.handleError)
    );
  }


  addCarDetails(car:ICar):Observable<any> {
   return this._http.post<ICar>(this._siteURL, car)
   .pipe(
    tap(data => console.log('add car message/error' + JSON.stringify(data))
    ),
    catchError(this.handleError)
    );
   }


  delCarDetails(carId:string):Observable<any> {
    let deleteURL=this._siteURL+":"+carId;
    return this._http.delete(deleteURL)
    .pipe(
      tap(data => console.log('del car message/error' + JSON.stringify(data))
    ),
    catchError(this.handleError)
    );
 
  }

  private handleError (err:HttpErrorResponse) {
    console.log('CarApiService: ' + err.message);
    return err.message;
  }


}

