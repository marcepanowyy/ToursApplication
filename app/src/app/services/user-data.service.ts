import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private dataStream = new BehaviorSubject(null) // if not logged in, user data is null

  constructor() {
  }

  getDataStream(){
    return this.dataStream.asObservable()
  }

  putDataToStream(data: any){
    this.dataStream.next(data)
  }

}


