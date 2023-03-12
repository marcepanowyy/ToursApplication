import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {UserDataService} from "./user-data.service";
import {Roles} from "../models/roles";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData: any

  constructor(private router: Router,
              private userDataService: UserDataService) {

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

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(){
    return !!this.userData
  }

  isClient(){
    if(this.userData) return this.userData.role === Roles.client
    return false
  }

  isManager(){
    if(this.userData) return this.userData.role === Roles.manager
    return false
  }

  isAdmin(){
    if(this.userData) return this.userData.role === Roles.admin
    return false
  }

  logoutUser(){
    alert("logged out succesfully")
    localStorage.removeItem('token')
    this.userDataService.putDataToStream(null) // clearing the service data
    this.router.navigate(['/Login'])
  }

  isTokenExpired(token: any){
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    // console.log(expiry)
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

}
