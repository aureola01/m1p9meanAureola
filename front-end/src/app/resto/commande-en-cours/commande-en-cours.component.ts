import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-commande-en-cours',
  templateUrl: './commande-en-cours.component.html',
  styleUrls: ['./commande-en-cours.component.css']
})
export class CommandeEnCoursComponent implements OnInit {
  // @ViewChild(MatSort)
  // sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;  

  array: any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  pageSize = 10;
  currentPage = 0;
  totalSize = 0;
  data_length = 10;
  constructor() { }

  ngOnInit(): void {
    this.getArray();
    // this.dataSource.sort = this.sort;
  }
  public handlePage(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  
  private getArray() {
    // this.app.getDeliveries()
    //   .subscribe((response) => {
    //     this.dataSource = new MatTableDataSource<Element>(response);
    //     this.dataSource.paginator = this.paginator;
    //     this.array = response;
    //     this.totalSize = this.array.length;
    //     this.iterator();
    //   });
    
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.array = ELEMENT_DATA;
        this.totalSize = this.array.length;
        this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }
}
/* Static data */ 
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];