import {Component, OnInit} from '@angular/core';
import {ResToursGeneralService} from "../services/res-tours.general.service";
import {AuthService} from "../services/auth.service";
import {UserDataService} from "../services/user-data.service";
import {Roles} from "../models/roles";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{

  reservedTours = new Map();
  userData: any
  Roles = Roles


  constructor(private resToursGeneralService: ResToursGeneralService,
              private userDataService: UserDataService,
              public authService: AuthService) {

    const reservedTours = this.resToursGeneralService.getDataStream(); // getting reserved tours

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

  ngOnInit() {
  }

  countSum(){
    let sum = 0
    for(let [key, value] of this.reservedTours){
      sum += value
    }
    return sum
  }

  // prevent navbar from popping up when clicked on li

  public get height() {
    return window.innerHeight;
  }

  public get width() {
    return window.innerWidth;
  }

  check() {
    if(this.width < 1000) {
      const checkbox = document.getElementById("click") as HTMLInputElement;
      if(checkbox.checked) checkbox.checked = !checkbox.checked
    }
  }




}
