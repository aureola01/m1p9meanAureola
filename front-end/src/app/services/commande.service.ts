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
  getPanier(){
    let panier:any[] = [];
    var keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      panier.push(JSON.parse(localStorage.getItem(keys[i]) as string));
    }
    console.log("panier"+panier);
    return panier;
  }
  removePanier(){
    var keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      localStorage.removeItem(keys[i]);
    }
  }
  prixTotalCom(){
    let prixTotal = 0;
    let panier = this.getPanier();
    for(let i = 0; i<panier.length; i++){
      prixTotal = prixTotal + panier[i].totalPriceRow;
    }
    console.log("prixCommande"+prixTotal);
    return prixTotal;
  }

  commander(commande:any){
    console.log(commande)
    const options = this.toolServ.formOption(true, sessionStorage.getItem("session_token"));
    return this.http.post(base_url+'/order', commande, options);
  }
  
}
