import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './shared/signup/signup.component';
import { LoginComponent } from './shared/login/login.component';
import { CommandeEnCoursComponent } from './resto/commande-en-cours/commande-en-cours.component';
import { ListePlatsComponent } from './client/liste-plats/liste-plats.component';
import { CommanderComponent } from './client/commander/commander.component';

const routes: Routes = [
  { path:"client/signup" , component: SignupComponent },
  { path:"login" , component: LoginComponent },
  { path:"liste-plats" , component: ListePlatsComponent },
  { path:"commander" , component: CommanderComponent },
  { path:"resto/commande-en-cours" , component: CommandeEnCoursComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
