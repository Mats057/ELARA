import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { ClothesComponent } from '../clothes/clothes.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'clothes/:id', component: ClothesComponent, canActivate: [authGuard] },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
