import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";

import {Tour} from "../models/tour"
import {ApiService} from "../services/api.service";
import {ToursGeneralService} from "../services/tours.general.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{

  tourForm !: FormGroup;
  tours: Tour[];

  constructor(private formBuilder : FormBuilder,
              private api : ApiService,
              private toursGeneralService: ToursGeneralService,
              private datePipe: DatePipe) {

    const dataTours = this.toursGeneralService.getDataStream(); // getting tours

    dataTours.subscribe({
      next: (data: any) => {
        this.tours = data
      },
      error: (err: any) => {
        alert(err)
      }
    })

  }

  ngOnInit(): void {

    this.tourForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        country: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        price: ['', Validators.required],
        limit: ['', Validators.required],
        description: ['', Validators.required],
        photoLink: ['', Validators.required],
        initialLimit: [''],
        votes: [0],
      }
    )
  }

  get Name(): FormControl{
    return this.tourForm.get("name") as FormControl
  }

  get Country(): FormControl{
    return this.tourForm.get("country") as FormControl
  }

  get StartDate(): FormControl{
    return this.tourForm.get("startDate") as FormControl
  }

  get EndDate(): FormControl{
    return this.tourForm.get("endDate") as FormControl
  }

  get Price(): FormControl{
    return this.tourForm.get("price") as FormControl
  }

  get Limit(): FormControl{
    return this.tourForm.get("limit") as FormControl
  }

  get PhotoLink(): FormControl{
    return this.tourForm.get("photoLink") as FormControl
  }

  get Description(): FormControl{
    return this.tourForm.get("description") as FormControl
  }

  addTour(){

    if(this.tourForm.valid){
      this.tourForm.value.initialLimit = this.tourForm.value.limit
      this.tourForm.value.startDate  = new DatePipe('en-US').transform(this.tourForm.value.startDate,  'mediumDate')
      this.tourForm.value.endDate= new DatePipe('en-US').transform(this.tourForm.value.endDate,  'mediumDate')

      this.api.addTour(this.tourForm.value).subscribe({
        next:(res) => {
          alert("tour added succesfully")
          this.tourForm.reset();
        },
        error:() => {
          alert("Error while adding the tour")
        }
      })
    }
  }

}
