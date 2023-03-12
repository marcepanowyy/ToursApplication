import {Component, OnInit} from '@angular/core';
import {ToursGeneralService} from "../services/tours.general.service";
import {ResToursGeneralService} from "../services/res-tours.general.service";
import {Tour} from "../models/tour";
import {ApiService} from "../services/api.service";
import {UserDataService} from "../services/user-data.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

// creating map with reservated tours id->number of reservated tours with same tour id
// and map with number of chosen tours of particular id in option initially it has id1 -> 0
//                                                                                 id5 -> 0...
// when selected option, the "chosen map" values are updated

export class BasketComponent implements OnInit {

  tours: any
  reservedTours: Map<string, number> = new Map();
  chosen: Map<string, number> = new Map(); // id of chosen tour -> number of chosen tours with same id to be paid for in option
  bought: Map<string, number> = new Map(); // id of chosen tour -> bought amount
  userData: any

  constructor(private api: ApiService,
              private toursGeneralService: ToursGeneralService,
              private resToursGeneralService: ResToursGeneralService,
              private userDataService: UserDataService){

    const dataTours = this.toursGeneralService.getDataStream(); // getting tours obj
    dataTours.subscribe({
      next: (data: any) => {
        this.tours = data
      },
      error: (err: any) => {
        alert(err)
      }
    })

    const dataReservedTours = this.resToursGeneralService.getDataStream(); // getting empty map of reservated tours
    dataReservedTours.subscribe({

      next: (data: any) => {
        this.reservedTours = data
      },
      error: (err: any) => {
        alert(err)
      }
    })

    const userData = this.userDataService.getDataStream(); // getting user data
    userData.subscribe({
      next: (data: any) => {
        this.userData = data
      },
      error: (err: any) => {
        alert(err)
      }
    })

    this.setInitialValuesToMaps()

  }

  setInitialValuesToMaps() {
    this.reservedTours.forEach((value, key) => {
      this.chosen.set(key, 0)
    })
  }

  ngOnInit() {
  }

  printMap(map: Map<number, number>) {
    for (const [key, value] of map) {
      // console.log(`id = ${key} -> ilość = ${value}`)
      console.log(typeof key, typeof value)
    }

  }

  checkSumCondition(): boolean {

    let sum = 0;
    this.reservedTours.forEach((v: any) => {
      sum += v;
    })
    return (sum < 10);
  }

  selectChangeHandler(event: any, _id: string) { // after chosing selected amount we set it in map
    this.chosen.set(_id, event.target.value)
  }

  update(_id: string){ // after clicked "buy" button we have to subtract bought amount from general amount

      if(this.chosen.get(_id) == 0) return

      // @ts-ignore
      if (this.reservedTours.get(_id) - this.chosen.get(_id) == 0){
        this.reservedTours.delete(_id)
      }
      else {
        // @ts-ignore
        this.reservedTours.set(_id, this.reservedTours.get(_id) - this.chosen.get(_id))
      }

    this.addOrder(_id,  Number(this.chosen.get(_id))); // add order to db

    this.tours.find((tour: Tour) => tour._id === _id).initialLimit -= Number(this.chosen.get(_id)) // updating initial limit

    alert(`${this.chosen.get(_id)} Tour(s) bought succesfully`)
    this.chosen.set(_id, 0);

    }

  getResTourNum(_id: string){
    return this.reservedTours.get(_id)
  }

  getToursTotalPrice(tour: Tour){
    // @ts-ignore
    return this.reservedTours.get(tour._id) * tour.price
  }

  getArr(_id: string){
    // @ts-ignore
    return [].constructor(this.getResTourNum(_id) + 1)
  }

  getTour(_id: string){
    return this.tours.find((tour: { _id: string; }) => tour._id == _id)
  }

  addOrder(tourId: string, amount: number){
    this.api.addOrder({email: this.userData.email, tourId: tourId, amount: amount, date: Date()}).subscribe({
      next:(res: any) => {
      },
      error:(err: any) => {
        alert(`Error, ${err.error.message}`);
      }
    })
  }

}
