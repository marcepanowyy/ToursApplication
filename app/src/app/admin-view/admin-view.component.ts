import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Roles} from "../models/roles"

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  users: any
  Roles = Roles

  constructor(private api: ApiService) {

    this.api.getUsers().subscribe({ // only admin can load users - it is forbidden for other roles (e.g. manager)
      next: (res) => {
        this.users = res
      },
      error: (err) => {
        alert(`error ${err.message}`)
      }
    })

  }

  ngOnInit(): void {

  }

  ban(userId: string){
    this.api.banUser({_id: userId}).subscribe({
      next:(res) => {
        alert(`User: ${userId} has been banned`)
      },
      error:(err) => {
        alert(`Error, ${err.error.message}`);
      }
    })
  }

  unban(userId: string){
    this.api.unbanUser({_id: userId}).subscribe({
      next:(res) => {
        alert(`User: ${userId} has been unbanned`)
      },
      error:(err) => {
        alert(`Error, ${err.error.message}`);
      }
    })
  }

  setAdmin(userId: string){
    this.api.setAdmin({_id: userId}).subscribe({
      next:(res) => {
        alert(`User: ${userId} 'role has been changed to Admin`)
      },
      error:(err) => {
        alert(`Error, ${err.error.message}`);
      }
    })
  }

  setManager(userId: string){
    this.api.setManager({_id: userId}).subscribe({
      next:(res) => {
        alert(`User: ${userId} 's role has been changed to Manager`)
      },
      error:(err) => {
        alert(`Error, ${err.error.message}`);
      }
    })
  }

  setClient(userId: string){
    this.api.setClient({_id: userId}).subscribe({
      next:(res) => {
        alert(`User: ${userId} 's role has been changed to Client`)
      },
      error:(err) => {
        alert(`Error, ${err.error.message}`);
      }
    })
  }

}
