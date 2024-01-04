import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ClothesService } from '../../services/clothes.service';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit{

  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
  @ViewChild('viewAll') productsBtn!: ElementRef;

  showAll: boolean = false;
  clothes: any[] = [];

  constructor(private getData: ClothesService) {}

  ngOnInit() {
    this.getData.getClothes().subscribe((data: any) => {
      this.clothes = data;
    });
  }

  scrollAllClothes() {
    let element:any = document.getElementById('products');
    this.showAllClothes(this.productsBtn.nativeElement)
    console.log(element.offsetTop);
    element.scrollIntoView({ behavior: 'smooth' });
  }

  showAllClothes(e: any) {
    this.showAll = !this.showAll;
    e.innerHTML = this.showAll ? 'SHOW LESS' : 'VIEW ALL';
  }

  index = 0;

  swiperConfig: SwiperOptions = {
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        pagination: true,
      },
      768: {
        slidesPerView: 3,
        pagination: true,
      },
      620: {
        slidesPerView: 2,
        pagination: true,
      },
    },
  }

  ngAfterViewInit() {
    this.swiper.nativeElement.swiper.activeIndex = this.index;
  }

  slideChange(swiper: any) {
    this.index = swiper.detail[0].activeIndex;
  }

}
