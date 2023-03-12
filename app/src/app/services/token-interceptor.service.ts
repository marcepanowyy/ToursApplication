import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector,
              private api: ApiService){

  }

  intercept(req: any, next: any){
    let authService = this.injector.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }

}
