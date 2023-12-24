import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../header/header.component';
import { ClothesShowComponent } from './clothes-show/clothes-show.component';
import { FooterComponent } from '../footer/footer.component';
import { ClothesComponent } from '../clothes/clothes.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ClothesShowComponent,
    FooterComponent,
    ClothesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],

})
export class HomeModule { }
