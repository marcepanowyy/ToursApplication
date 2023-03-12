import {Component, Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {UserDataService} from "../services/user-data.service";
import {Roles} from "../models/roles";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    pwd: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(12)]),
  })

  constructor(private formBuilder : FormBuilder,
              private api : ApiService,
              private router: Router,
              private userDataService: UserDataService) {
  }

  ngOnInit(): void{
  }

  loginSubmited(){

    this.loginUser()
    this.loginForm.reset();

  }

  get Email(): FormControl{
    return this.loginForm.get("email") as FormControl
  }

  get PWD(): FormControl{
    return this.loginForm.get("pwd") as FormControl
  }

  loginUser(){
    this.api.loginUser({email: this.loginForm.value.email, password: this.loginForm.value.pwd}).subscribe({
      next:(res) => {
        alert(`${Roles[res.role]} logged succesfully`)
        localStorage.setItem('token', res.token)
        this.userDataService.putDataToStream({email: res.email, role: res.role, blocked: res.blocked, _id: res._id})
        this.router.navigate(['/Tours'])
      },
      error:(err) => {
        alert(`Error, ${err.error.message}`);
      }
    })
  }

}
