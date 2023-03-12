import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ResToursGeneralService {

  private dataStream = new BehaviorSubject("")

  constructor() {
  }

  getDataStream(){
    return this.dataStream.asObservable()
  }

  putDataToStream(data: any){
    this.dataStream.next(data)
  }

}
