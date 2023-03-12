import { Component } from '@angular/core';
import {Tour} from "../models/tour";
import {ApiService} from "../services/api.service";
import {ToursGeneralService} from "../services/tours.general.service";
import {ResToursGeneralService} from "../services/res-tours.general.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})

export class ToursComponent {

  tours: Tour[] = [];
  reservedTours = new Map();
  disabled = true;

  // getting data

  constructor(private api: ApiService,
              private toursGeneralService: ToursGeneralService,
              private resToursGeneralService: ResToursGeneralService,
              public authService: AuthService) {

    const dataTours = this.toursGeneralService.getDataStream(); // getting tours

    dataTours.subscribe({
      next: (data: any) => {
        this.tours = data
        this.findDistinguished()
      },
      error: (err: any) => {
        alert(err)
      }
    })

    const reservedTours = this.resToursGeneralService.getDataStream(); // getting empty map
    reservedTours.subscribe({
      next: (data: any) => {
        this.reservedTours = data
      },
      error: (err: any) => {
        alert(err)
      }
    })

  }

  ngOnInit(): void {
  }

  addVote(tour: Tour, value: number): void {
    tour.votes += value
  }

  deleteTour(tour: Tour): void {
    this.tours = this.tours.filter(e => e !== tour)
  }

  // filters

  selectedCountry: string = "";
  selectedBottomPrice: string = "";
  selectedTopPrice: string = "";
  selectedVotes: string = ""

  changeCountry(country: any): void {
    this.selectedCountry = country;
  }

  changeBottomPrice(price: any): void {
    this.selectedBottomPrice = price
  }

  changeTopPrice(price: any): void {
    this.selectedTopPrice = price
  }

  changeVotes(votes: any): void {
    this.selectedVotes = votes
  }

  changeFiltering(): void {
    this.selectedCountry = "";
    this.selectedBottomPrice = "";
    this.selectedTopPrice = "";
    this.selectedVotes = "";
  }

  // price condition

  minPriceTour: Tour;
  maxPriceTour: Tour;
  maxPrice = -Infinity
  minPrice = Infinity

  findDistinguished(): void{
    for(let tour of this.tours){
      if(tour.price < this.minPrice){
        this.minPriceTour = tour
        this.minPrice = tour.price
      }
      if(tour.price > this.maxPrice){
        this.maxPriceTour = tour
        this.maxPrice = tour.price
      }
    }
  }

  // reservating tours

  updateReservatedTours(tour: Tour, value: number): void {

      if (this.reservedTours.has(tour._id)) {
        this.reservedTours.set(tour._id, this.reservedTours.get(tour._id) + value)
        if(this.reservedTours.get(tour._id) == 0) this.reservedTours.delete(tour._id)
      } else {
        this.reservedTours.set(tour._id, value)
      }
      tour.limit -= value
  }

  // pagination

  p: number = 1;

}
