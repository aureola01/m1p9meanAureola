import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolService } from './tool.service';
import { base_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, private toolServ : ToolService) { }
  login(user:any){
    return this.http.post(base_url + '/user/login', user);
  }
  signup(user:any){
    return this.http.post(base_url + '/user/sign_up', user);
  }
  getUserById(){
    const options = this.toolServ.formOption(true, sessionStorage.getItem("session_token"));
    console.log(sessionStorage.getItem("id_user"));
    let url = base_url+'/user/'+sessionStorage.getItem("id_user");
    console.log(url);
    return this.http.get(url, options);
  }
}
