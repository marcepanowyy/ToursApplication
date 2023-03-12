import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tour} from "../models/tour";
import {UserDataService} from "./user-data.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  userData: any;

  constructor(private http: HttpClient,
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

  getTours(){
    return this.http.get<Tour[]>("http://localhost:8080/tours/");
  }

  getUsers(){
    return this.http.get<any>("http://localhost:8080/users/");
  }

  addTour(data: any){
    return this.http.post<any>("http://localhost:8080/tours", data);
  }

  registerUser(data: any){
    return this.http.post<any>("http://localhost:8080/register", data);
  }

  loginUser(user: any){
    return this.http.post<any>("http://localhost:8080/login", user)
  }

  addOrder(order: any){
    return this.http.post<any>("http://localhost:8080/orders", order)
  }

  addReview(review: any){
    return this.http.post<any>("http://localhost:8080/reviews", review)
  }

  refreshToken(userId: any){ // email, expired token
    return this.http.post<any>("http://localhost:8080/refresh/token", userId)
  }

  getOrders(userId: any){
    return this.http.get<any>(`http://localhost:8080/orders/${userId}`)
  }

  banUser(userId: any){
    return this.http.put<any>("http://localhost:8080/ban", userId)
  }

  unbanUser(userId: any){
    return this.http.put<any>("http://localhost:8080/unban", userId)
  }

  setAdmin(userId: any){
    return this.http.put<any>("http://localhost:8080/set/admin", userId)
  }

  setManager(userId: any){
    return this.http.put<any>("http://localhost:8080/set/manager", userId)
  }

  setClient(userId: any){
    return this.http.put<any>("http://localhost:8080/set/client", userId)
  }


}
