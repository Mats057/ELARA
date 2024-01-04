import { Component } from '@angular/core';
import { ClothesService } from '../services/clothes.service';
import { SwiperOptions } from 'swiper/types';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss']
})
export class ClothesComponent {

  cloth: any = {};

  constructor(private getCloth: ClothesService) { }

  slideChange(swiper: any) {
    this.index = swiper.detail[0].activeIndex;
  }

  ngAfterViewInit() {
    feather.replace();
  }

  index = 0;

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
    },
    breakpoints: {

    },
  }
}
