import { Clothes } from './../../shared/clothes';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ClothesService } from '../../services/clothes.service';
import { SwiperOptions } from 'swiper/types';
import * as feather from 'feather-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss'],
})
export class ClothesComponent implements AfterViewInit, OnInit {
  clothID: string = this.activatedRoute.snapshot.paramMap.get('id')!;

  cloth: any = {};

  filteredColors: any[] = [];

  constructor(
    private clothesService: ClothesService,
    private activatedRoute: ActivatedRoute
  ) {}

  slideChange(swiper: any) {
    this.index = swiper.detail[0].activeIndex;
  }

  ngOnInit() {
    this.clothesService.getCloth(this.clothID).subscribe({
      next: (data) => {
        this.cloth = data;
        this.filteredColors = [...new Set(this.cloth.images.map((item: any) => item.color))]
      },
    });
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
    breakpoints: {},
  };
}
