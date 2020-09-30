import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NovaConsultaComponent } from './pages/nova-consulta/nova-consulta.component';
import { AuthGuard } from './auth/auth.guard';
import { AnonGuard } from './auth/anon.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [AnonGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AnonGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'nova-consulta', component: NovaConsultaComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
