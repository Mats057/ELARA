import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { ClothesComponent } from '../clothes/clothes.component';
import { authGuard } from '../guards/auth.guard';
import { AboutComponent } from '../about/about.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'clothes/:id',
        component: ClothesComponent,
        canActivate: [authGuard],
      },
      { path: 'about', component: AboutComponent },
      { path: '', component: MainComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
