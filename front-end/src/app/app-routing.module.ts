import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './shared/signup/signup.component';
import { LoginComponent } from './shared/login/login.component';
import { CommandeEnCoursComponent } from './resto/commande-en-cours/commande-en-cours.component';

const routes: Routes = [
  { path:"client/signup" , component: SignupComponent },
  { path:"login" , component: LoginComponent },
  { path:"liste-plats" , component: LoginComponent },
  { path:"resto/commande-en-cours" , component: CommandeEnCoursComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
