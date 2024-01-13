import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [{ path: '', component: LoginComponent,  canActivate: [authGuard]}, 
  { path: 'new', component: RegisterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
