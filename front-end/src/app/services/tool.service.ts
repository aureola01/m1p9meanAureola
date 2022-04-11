import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolService {


  constructor() { }
  formOption (use_authorization = false, session:any) {
    const options = { 
      headers: {
        'Content-Type' : 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Authorization' : ""
      }
    };
    
    if (use_authorization) {
      options.headers.Authorization = 'Bearer ' + session;
    }
    return options;
  }
}
