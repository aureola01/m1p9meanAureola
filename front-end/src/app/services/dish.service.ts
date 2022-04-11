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
    return this.http.get(base_url + '/dish');
  }
  create_dish(resto:any){
    // return this.http.post(base_url + '/dish/');
  }
}
