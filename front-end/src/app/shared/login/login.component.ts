import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToolService } from 'src/app/services/tool.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any={
    login:"",
    password:""
  };
  error_message:any = "";
  success_message:any = "";
  constructor(public activatedRoute : ActivatedRoute, private userServ : UserService, private toolServ : ToolService, private route : Router) { }

  ngOnInit(): void {
  }
  login(){
    const onSuccess = (response: any) => {
      console.log(response.data);
      if (response.data['code'] == 200) {
        console.log("200"+response.data['message']);
        sessionStorage.setItem("session_token", response.data['data']['token']);
        console.log(sessionStorage.getItem("session_token"));
        this.success_message = response.data['message'];
        if(response.data['data']['user']['userType']['name'] == "client"){
          this.route.navigate(['/liste-plats']);
        }
      } else {
        console.log("500"+response.data['message']);
        this.error_message = response.data['message'];
      }
    }
    const onError = (response: any) => {
      console.log("onError");
      this.error_message = "Il y a eu une erreur, veuillez reessayer";
    }
    this.userServ.login(this.user).subscribe(onSuccess, onError);
  }
}
