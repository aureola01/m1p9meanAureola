import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToolService } from 'src/app/services/tool.service';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-liste-plats',
  templateUrl: './liste-plats.component.html',
  styleUrls: ['./liste-plats.component.css']
})
export class ListePlatsComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;  

  error_message: string = "";
  allDishes: any = [];
  data_length = 0;
  array: any;
  displayedColumns: string[] = ['Nom', 'Code', 'Description', 'Prix', 'Image', 'Restaurant', 'Option'];
  pageSize = 10;
  currentPage = 0;
  totalSize = 0;

  constructor(public activatedRoute : ActivatedRoute, private dishServ : DishService, private toolServ : ToolService, private route : Router) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem("session_token"));
    if(sessionStorage.getItem("session_token")){
     this.getAllDishes();
    }
  }

  getAllDishes(){
    const onSuccess = (response: any) => {
      console.log(response.data);
      this.data_length = response['data'].length;
      this.allDishes = new MatTableDataSource(response['data']);
      this.allDishes.paginator = this.paginator;
      this.array = response['data'];
      this.totalSize = this.array.length;
      this.iterator();
    }
    const onError = (response: any) => {
      console.log("onError");
      this.error_message = "Il y a eu une erreur recuperant les plats, veuillez reessayer";
    }
    this.dishServ.getAllDishes().subscribe(onSuccess, onError);
  }

  public handlePage(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.allDishes = part;
  }
}
