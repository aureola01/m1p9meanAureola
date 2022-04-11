import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToolService } from 'src/app/services/tool.service';
import { CommandeService } from 'src/app/services/commande.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-commander',
  templateUrl: './commander.component.html',
  styleUrls: ['./commander.component.css']
})
export class CommanderComponent implements OnInit {
  displayedColumns: string[] = ['Plat', 'Restaurant', 'Quantite', 'Prix'];
  dataSource:any[] = [];
  prixTotalCommande = 0;
  commande:any;
  delivery_place:any;
  client_contact:any;
  client:any;
  error_message:string="";

  constructor(public activatedRoute : ActivatedRoute, private userServ:UserService, private comServ:CommandeService, private toolServ : ToolService, private route : Router) { }

  ngOnInit(): void {
    this.dataSource = this.comServ.getPanier();
    this.prixTotalCommande = this.comServ.prixTotalCom();
    const onSuccess = (response: any) => {
      console.log(response.data);
      this.client = response['data'];
    }
    const onError = (response: any) => {
      console.log("onError");
      this.error_message = "Il y a eu une erreur, veuillez reessayer";
    }
    this.userServ.getUserById().subscribe(onSuccess, onError);
  }
  commander(){
    console.log(this.client);
    this.commande = {
      date: new Date(),
      etat: false,
      readyForDelivery: false,
      detail: this.dataSource,
      client: this.client,
      waitingForDeliverer: false,
      delivery_man: {},
      delivery_price: 3000,
      delivery_place: this.delivery_place,
      client_contact: this.client_contact,
      dish_price: this.prixTotalCommande,
    }
    console.log("commamnde"+JSON.stringify(this.commande));

    const onSuccess = (response: any) => {
      console.log(response.data);
      this.comServ.removePanier();
    }
    const onError = (response: any) => {
      console.log("onError");
      this.error_message = "Il y a eu une erreur, veuillez reessayer";
    }
    this.comServ.commander(this.commande).subscribe(onSuccess, onError);
  }
}
