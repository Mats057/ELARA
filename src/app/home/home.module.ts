import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../header/header.component';
import { ClothesShowComponent } from './clothes-show/clothes-show.component';
import { FooterComponent } from '../footer/footer.component';
import { ClothesComponent } from '../clothes/clothes.component'
import { SwiperDirective } from '../shared/swiper.directive';

register()

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ClothesShowComponent,
    FooterComponent,
    ClothesComponent,
    SwiperDirective
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class HomeModule { }
