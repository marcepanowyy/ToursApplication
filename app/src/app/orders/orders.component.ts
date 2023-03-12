import { Component } from '@angular/core';
import {ToursGeneralService} from "../services/tours.general.service";
import {Tour} from "../models/tour";
import {ApiService} from "../services/api.service";
import {UserDataService} from "../services/user-data.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  tours: any
  today = new Date();
  userData: any
  orders: any

  constructor(private api: ApiService,
              private userDataService: UserDataService,
              private toursGeneralService: ToursGeneralService){

    const dataTours = this.toursGeneralService.getDataStream(); // getting tours
    dataTours.subscribe({
      next: (data: any) => {
        this.tours = data
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

    this.getOrders()

  }

  getStatus(tour: Tour): string{

    let startDate = new Date(tour.startDate)
    let endDate = new Date(tour.endDate)
    if(endDate < this.today) return "finished"
    else if(endDate > this.today && startDate < this.today) return "active"
    else if(startDate > this.today) return "await"
    else return "incorrect data"

  }

  // getting orders (bought tours) from db

  getOrders(){
    this.api.getOrders(this.userData._id).subscribe({
      next:(res) => {
        this.orders = res
        // console.log(this.orders)
      },
      error:(err) => {
        alert(`Error, ${err.error.message}`);
      }
    })
  }

  selectedOption: string = 'all'

}
