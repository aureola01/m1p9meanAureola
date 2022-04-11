import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public activatedRoute : ActivatedRoute, private toolServ : ToolService, private route : Router) { }

  ngOnInit(): void {
  }
  deconnecter(){
    sessionStorage.removeItem("session_token");
    sessionStorage.removeItem("id_user");
    this.route.navigate(['/login']);
  }
}
