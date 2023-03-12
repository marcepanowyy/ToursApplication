import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {UserDataService} from "../services/user-data.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  repeatPass: string = 'none'

  registerForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    pwd: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(12)]),
    rpwd: new FormControl(""),
  })

  constructor(private formBuilder : FormBuilder,
              private api : ApiService,
              private router: Router,
              private userDataService: UserDataService) {
  }

  ngOnInit(): void{
  }

  registerSubmited(){

    if(this.PWD.value == this.RPWD.value){

      this.addUser()
      this.registerForm.reset();
      this.repeatPass = 'none'

    }
    else {
      this.repeatPass = 'inline'
    }
  }

  get Email(): FormControl{
    return this.registerForm.get("email") as FormControl
  }

  get PWD(): FormControl{
    return this.registerForm.get("pwd") as FormControl
  }

  get RPWD(): FormControl{
    return this.registerForm.get("rpwd") as FormControl
  }


  addUser(){

    this.api.registerUser({email: this.registerForm.value.email, password: this.registerForm.value.pwd}).subscribe({
      next:(res) => {
        alert("registration completed!, you are logged in")
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
