import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './layout/dashboard/dashboard.component';
import {ErreurComponent} from './layout/erreur/erreur.component';
import {LoginComponent} from './layout/login/login.component';
import {ListUserComponent} from './layout/user/list-user/list-user.component';
import {DetailUserComponent} from './layout/user/detail-user/detail-user.component';
import {AddUserComponent} from './layout/user/add-user/add-user.component';
import {ListAppelComponent} from './layout/appel/list-appel/list-appel.component';
import {AddAppelComponent} from './layout/appel/add-appel/add-appel.component';
import {DetailAppelComponent} from './layout/appel/detail-appel/detail-appel.component';
import {EditPasswordComponent} from './layout/user/edit-password/edit-password.component';

const routes: Routes = [
  {path: 'Dashboard', component: DashboardComponent},
  {path: '', redirectTo: 'Dashboard', pathMatch: 'full'},
  {path: 'Connexion', component: LoginComponent},
  {path: 'USERS', component: ListUserComponent},
  {path: 'USERS/:id', component: DetailUserComponent},
  {path: 'ADD_USER', component: AddUserComponent},
  {path: 'PASSWORD', component: EditPasswordComponent},
  {path: 'CALLS', component: ListAppelComponent},
  {path: 'CALLS/:id', component: DetailAppelComponent },
  {path: 'ADD_CALL', component: AddAppelComponent},
  {path: '**', component: ErreurComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
