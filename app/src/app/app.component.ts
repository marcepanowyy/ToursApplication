import { Component, OnInit} from '@angular/core';
import {ApiService} from "./services/api.service";
import {ToursGeneralService} from "./services/tours.general.service";
import {Tour} from "./models/tour"
import {ResToursGeneralService} from "./services/res-tours.general.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tours: Tour[] = [];
  reservatedTours = new Map();
  boughtTours = new Map()

  constructor(private api: ApiService,
              private toursGeneralService: ToursGeneralService,
              private resToursGeneralService: ResToursGeneralService,
  ) {
  }

  ngOnInit(): void {

    this.api.getTours().subscribe({
      next: (res) => {
        this.tours = res
        this.toursGeneralService.putDataToStream(this.tours) // pass tours
      },
      error: (err) => {
        // console.log(err)
        alert(`error ${err.message}`)
      }
    })
    this.resToursGeneralService.putDataToStream(this.reservatedTours) // pass initial empty map just to be defined in basket component
  }
}
