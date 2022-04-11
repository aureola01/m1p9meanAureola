import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolService } from './tool.service';
import { base_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http : HttpClient, private toolServ : ToolService) { }
  getAllDishes(){
    const options = this.toolServ.formOption(true, sessionStorage.getItem("session_token"));
    return this.http.get(base_url + '/dish', options);
  }
  create_dish(dish:any){
    return this.http.post(base_url + '/dish', dish);
  }
}
