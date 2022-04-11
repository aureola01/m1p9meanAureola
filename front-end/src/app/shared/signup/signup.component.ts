import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToolService } from 'src/app/services/tool.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: any={
    userType: { name:"client" },
    firstName:"",
    lastName:"",
    login:"",
    password:""
  };
  error_message:any = "";
  success_message:any = "";

  constructor(public activatedRoute : ActivatedRoute, private userServ : UserService, private toolServ : ToolService, private route : Router) { }

  ngOnInit(): void {
  }
  signup(){
    const onSuccess = (response: any) => {
      console.log(response['data']);
      sessionStorage.setItem("session_token", response.data['token']);
      console.log(sessionStorage.getItem("session_token"));
      this.success_message = response['message'];
      if(response['data']['user']['userType']['name'] == "client"){
        this.route.navigate(['/liste-plats']);
      }
    }
    const onError = (response: any) => {
      console.log("onError");
      this.error_message = "Il y a eu une erreur, veuillez reessayer";
    }
    console.log(this.user);
    this.userServ.signup(this.user).subscribe(onSuccess, onError);
  }

}
