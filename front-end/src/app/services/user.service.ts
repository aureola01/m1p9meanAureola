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
}
