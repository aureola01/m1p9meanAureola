import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolService } from './tool.service';
import { base_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http : HttpClient, private toolServ : ToolService) { }
  getCommandeEnCours(id_resto: any){
    this.http.get(base_url+"/")
  }
  
}
