import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Tour} from "src/app/models/tour"
import {ApiService} from "src/app/services/api.service";
import {ToursGeneralService} from "../../services/tours.general.service";
import {ResToursGeneralService} from "../../services/res-tours.general.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Roles} from "../../models/roles";
import {UserDataService} from "../../services/user-data.service";

@Component({
  selector: 'app-tour',
  templateUrl: './tour1.component.html',
  styleUrls: ['./tour1.component.css']
})
export class TourComponent implements OnInit{

  tours: Tour[];
  tour: Tour;
  tourId: string;
  reservedTours = new Map();
  userData: any

  constructor(private api: ApiService,
              private toursGeneralService: ToursGeneralService,
              private resToursGeneralService: ResToursGeneralService,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService,
              private userDataService: UserDataService,
              ) {


    const dataTours = this.toursGeneralService.getDataStream(); // getting tours
    // console.log(dataTours)

    dataTours.subscribe({
      next: (data: any) => {
        this.tours = data
        // @ts-ignore
        this.tour = this.tours.find((tour) => tour._id === this.activatedRoute.snapshot.paramMap.get('id'))
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

    const userData = this.userDataService.getDataStream(); // getting user data
    userData.subscribe({
      next: (data: any) => {
        this.userData = data
      },
      error: (err: any) => {
        alert(err)
      }
    })

  }

  ngOnInit(): void {
  }

  updatePlusReserveButton(){

    let plusDisableButton = false

    if(this.tour.limit <= 0){
      plusDisableButton = true
      // alert("you cannot reserve this tour, reached the limit")
    }
    return plusDisableButton
  }

  updateMinusReserveButton(tour: Tour){

    let minusDisableButton = true

    if(this.tour.limit < this.tour.initialLimit){
      minusDisableButton = false
    }
    return minusDisableButton
  }

  addVote(value: number) {
    this.tour.votes += value
  }

  updateReservatedTours(value: number): void {

    if (this.reservedTours.has(this.tour._id)) {
      this.reservedTours.set(this.tour._id, this.reservedTours.get(this.tour._id) + value)
      if(this.reservedTours.get(this.tour._id) == 0) this.reservedTours.delete(this.tour._id)
    } else {
      this.reservedTours.set(this.tour._id, value)
    }

    this.tour.limit -= value
    // this.toursBasketService.putDataToStream(this.reservedTours) // update map each time we click and pass it to basket component
  }

  // form (adding review)

  reviewForm = new FormGroup({
    nickname: new FormControl("", [Validators.required, Validators.minLength(5), Validators.pattern("[a-zA-Z].*")]),
    description: new FormControl("", [Validators.required, Validators.minLength(50), Validators.maxLength(500)]),
  })

  get Nickname(): FormControl{
    return this.reviewForm.get("nickname") as FormControl
  }
  get Description(): FormControl{
    return this.reviewForm.get("description") as FormControl
  }

  // reviews

  reviews = [
    {
      nickname: 'John',
      description: 'This was such an incredible trip! The sights were breathtaking and the activities were so much fun. I would highly recommend this tour to anyone looking for a great adventure!',
      date: new Date()
    },
    {
      nickname: 'Jill',
      description: 'I had a great time on this tour. The tour guide was very knowledgeable and the other travelers were friendly. I would recommend this tour to anyone looking for a unique experience.',
      date: new Date()
    },
    {
      nickname: 'Jack',
      description: 'The tour was alright but I didn’t think it was worth the money. The activities were not very interesting and the tour guide wasn’t very helpful. I would not recommend this tour to anyone.',
      date: new Date()
    },
    {
      nickname: 'Jenny',
      description: 'The tour was OK. The locations were nice to visit but the activities weren’t that fun. I wouldn’t recommend the tour to anyone unless they were looking for a relaxing trip.',
      date: new Date()
    },
    {
      nickname: 'James',
      description: 'This tour was amazing! The sights were beautiful and the activities were so much fun. I would highly recommend this tour to anyone looking for a great experience!',
      date: new Date()
    },
    {
      nickname: 'Joe',
      description: 'This tour was great! The tour guide was very knowledgeable and the other travelers were friendly. I would recommend this tour to anyone looking for a memorable experience.',
      date: new Date()
    },
    {
      nickname: 'Jessica',
      description: 'The tour was not great. The activities were not that interesting and the tour guide wasn’t very helpful. I would not recommend this tour to anyone unless they were looking for a quick getaway.',
      date: new Date()
    },
    {
      nickname: 'Jordan',
      description: 'The tour was alright. The locations were nice to visit but the activities weren’t that exciting. I wouldn’t recommend the tour to anyone unless they were looking for a laid-back trip.',
      date: new Date()
    },
    {
      nickname: 'Jeff',
      description: 'This tour was incredible! The sights were breathtaking and the activities were so much fun. I would highly recommend this tour to anyone looking for a memorable adventure!',
      date: new Date()
    },
    {
      nickname: 'Jasmine',
      description: 'I had a great time on this tour. The tour guide was very knowledgeable and the other travelers were friendly. I would recommend this tour to anyone looking for a unique experience.',
      date: new Date()
    },
    {
      nickname: 'Jeremy',
      description: 'The tour was not great. The activities were not very interesting and the tour guide wasn’t very helpful. I would not recommend this tour to anyone.',
      date: new Date()
    },
    {
      nickname: 'Julia',
      description: 'The tour was just OK. The locations were nice to visit but the activities weren’t that fun. I wouldn’t recommend the tour to anyone unless they were looking for a relaxing trip.',
      date: new Date()
    },
    {
      nickname: 'Jacob',
      description: 'This tour was amazing! The sights were beautiful and the activities were so much fun. I would highly recommend this tour to anyone looking for a great experience!',
      date: new Date()
    },
    {
      nickname: 'Jade',
      description: 'This tour was great! The tour guide was very knowledgeable and the other travelers were friendly. I would recommend this tour to anyone looking for a memorable experience.',
      date: new Date()
    },
    {
      nickname: 'Judy',
      description: 'The tour was not great. The activities were not that interesting and the tour guide wasn’t very helpful. I would not recommend this tour to anyone unless they were looking for a quick getaway.',
      date: new Date()
    },
    {
      nickname: 'Jon',
      description: 'The tour was alright. The locations were nice to visit but the activities weren’t that exciting. I wouldn’t recommend the tour to anyone unless they were looking for a laid-back trip.',
      date: new Date()
    },
    {
      nickname: 'Julie',
      description: 'This tour was incredible! The sights were breathtaking and the activities were so much fun. I would highly recommend this tour to anyone looking for a memorable adventure!',
      date: new Date()
    },
    {
      nickname: 'Jim',
      description: 'I had a great time on this tour. The tour guide was very knowledgeable and the other travelers were friendly. I would recommend this tour to anyone looking for a unique experience.',
      date: new Date()
    },
    {
      nickname: 'Jackie',
      description: 'The tour was not great. The activities were not very interesting and the tour guide wasn’t very helpful. I would not recommend this tour to anyone.',
      date: new Date()
    },
    {
      nickname: 'Jerry',
      description: 'The tour was just OK. The locations were nice to visit but the activities weren’t that fun. I wouldn’t recommend the tour to anyone unless they were looking for a relaxing trip.',
      date: new Date()
    },
    {
      nickname: 'Joel',
      description: 'This tour was amazing! The sights were beautiful and the activities were so much fun. I would highly recommend this tour to anyone looking for a great experience!',
      date: new Date()
    },
    {
      nickname: 'Jasmine',
      description: 'This tour was great! The tour guide was very knowledgeable and the other travelers were friendly. I would recommend this tour to anyone looking for a memorable experience.',
      date: new Date()
    },
    {
      nickname: 'John',
      description: 'The tour was not great. The activities were not that interesting and the tour guide wasn’t very helpful. I would not recommend this tour to anyone unless they were looking for a quick getaway.',
      date: new Date()
    },
    {
      nickname: 'Julie',
      description: 'The tour was alright. The locations were nice to visit but the activities weren’t that exciting. I wouldn’t recommend the tour to anyone unless they were looking for a laid-back trip.',
      date: new Date()
    }
  ];

  add(){

    if(this.userData) { // only if user is logged in

      this.api.addReview({userId: this.userData._id, nickname: this.Nickname.value, tourId: this.tour._id, description: this.Description.value, date: Date()
      }).subscribe({
        next: (res) => {
          alert("Review has been added")
        },
        error: (err) => {
          alert(`Error, ${err.error.message}`);
        }
      })
    }

    else alert("To post review, log in first")

  }

}
