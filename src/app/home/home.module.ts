import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { ClothesShowComponent } from './main/clothes-show/clothes-show.component';
import { FooterComponent } from './footer/footer.component';
import { ClothesComponent } from './clothes/clothes.component'
import { SwiperDirective } from '../shared/swiper.directive';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';

register()

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ClothesShowComponent,
    FooterComponent,
    ClothesComponent,
    SwiperDirective,
    AboutComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgOptimizedImage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class HomeModule { }
